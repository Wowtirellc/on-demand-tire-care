import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

interface QuotePayload {
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  tireSize?: string;
  tpmsNeeded: boolean;
  tpmsNotes?: string;
  message?: string;
  attachments?: { filename: string; content: string }[];
}

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const TO_EMAIL = "wheels2u@proton.me";
const FROM_EMAIL = "Wheels on Wheels <onboarding@resend.dev>";

const MAX_FILES = 5;
const MAX_BYTES = 5 * 1024 * 1024;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > RATE_MAX;
}

// Detect real image type from file bytes (magic numbers), not the filename.
function detectImage(b: Uint8Array): string | null {
  if (b.length < 12) return null;
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "jpg";
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return "png";
  if (b[0] === 0x47 && b[1] === 0x49 && b[2] === 0x46) return "gif";
  const tag = String.fromCharCode(...b.slice(8, 12));
  if (String.fromCharCode(...b.slice(0, 4)) === "RIFF" && tag === "WEBP") return "webp";
  const ftyp = String.fromCharCode(...b.slice(4, 8));
  if (ftyp === "ftyp" && /heic|heix|mif1|msf1|hevc/.test(tag)) return "heic";
  return null;
}

function cleanAttachment(a: unknown, i: number): { filename: string; content: string } | null {
  if (!a || typeof a !== "object") return null;
  const content = String((a as any).content ?? "").replace(/^data:[^,]*,/, "");
  if (!content || content.length > Math.ceil(MAX_BYTES / 3) * 4 + 8) return null;
  let bytes: Uint8Array;
  try {
    bytes = Uint8Array.from(atob(content.slice(0, 64)), (c) => c.charCodeAt(0));
  } catch {
    return null;
  }
  const ext = detectImage(bytes);
  if (!ext) return null;
  return { filename: `photo-${i + 1}.${ext}`, content };
}

const str = (v: unknown, max: number) => typeof v === "string" && v.trim().length > 0 && v.length <= max;

function escape(s: string): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: "Email service not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
    if (rateLimited(ip)) {
      return new Response(JSON.stringify({ error: "Too many requests. Please call or text us instead." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = (await req.json()) as QuotePayload;

    if (
      !str(data?.name, 100) || !str(data?.phone, 30) || !str(data?.vehicle, 200) ||
      !str(data?.email, 255) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ||
      (data.tireSize && String(data.tireSize).length > 50) ||
      (data.tpmsNotes && String(data.tpmsNotes).length > 500) ||
      (data.message && String(data.message).length > 2000)
    ) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const rawAtt = Array.isArray(data.attachments) ? data.attachments : [];
    if (rawAtt.length > MAX_FILES) {
      return new Response(JSON.stringify({ error: "Too many photos (max 5)" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const attachments = rawAtt.map(cleanAttachment);
    if (attachments.some((a) => a === null)) {
      return new Response(JSON.stringify({ error: "Only image files under 5MB are allowed" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const html = `
      <h2>New Quote Request - Wheels on Wheels</h2>
      <table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">
        <tr><td><strong>Name</strong></td><td>${escape(data.name)}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${escape(data.phone)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escape(data.email)}</td></tr>
        <tr><td><strong>Vehicle</strong></td><td>${escape(data.vehicle)}</td></tr>
        <tr><td><strong>Tire size</strong></td><td>${escape(data.tireSize || "-")}</td></tr>
        <tr><td><strong>TPMS needed</strong></td><td>${data.tpmsNeeded ? "Yes" : "No"}</td></tr>
        ${data.tpmsNeeded ? `<tr><td><strong>TPMS notes</strong></td><td>${escape(data.tpmsNotes || "-")}</td></tr>` : ""}
        <tr><td valign="top"><strong>Message</strong></td><td>${escape(data.message || "-").replace(/\n/g, "<br/>")}</td></tr>
      </table>
    `;

    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: data.email,
        subject: `New quote request from ${data.name.replace(/[\r\n]/g, " ").slice(0, 100)}`,
        html,
        ...(attachments.length > 0 ? { attachments } : {}),
      }),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      console.error("Resend error:", errText);
      return new Response(JSON.stringify({ error: "Failed to send email" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("send-quote-email error:", e);
    return new Response(JSON.stringify({ error: "Unexpected error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
