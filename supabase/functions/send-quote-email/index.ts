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
}

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const TO_EMAIL = "wheels2u@proton.me";
const FROM_EMAIL = "Wheels on Wheels <onboarding@resend.dev>";

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

    const data = (await req.json()) as QuotePayload;

    if (!data?.name || !data?.email || !data?.phone || !data?.vehicle) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const html = `
      <h2>New Quote Request — Wheels on Wheels</h2>
      <table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">
        <tr><td><strong>Name</strong></td><td>${escape(data.name)}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${escape(data.phone)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escape(data.email)}</td></tr>
        <tr><td><strong>Vehicle</strong></td><td>${escape(data.vehicle)}</td></tr>
        <tr><td><strong>Tire size</strong></td><td>${escape(data.tireSize || "—")}</td></tr>
        <tr><td><strong>TPMS needed</strong></td><td>${data.tpmsNeeded ? "Yes" : "No"}</td></tr>
        ${data.tpmsNeeded ? `<tr><td><strong>TPMS notes</strong></td><td>${escape(data.tpmsNotes || "—")}</td></tr>` : ""}
        <tr><td valign="top"><strong>Message</strong></td><td>${escape(data.message || "—").replace(/\n/g, "<br/>")}</td></tr>
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
        subject: `New quote request from ${data.name}`,
        html,
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
