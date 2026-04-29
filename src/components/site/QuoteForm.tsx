import { useState, type FormEvent, type ChangeEvent } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { Upload, X } from "lucide-react";

const quoteSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(7, "Phone is required").max(30),
  email: z.string().trim().email("Invalid email").max(255),
  vehicle: z.string().trim().min(1, "Vehicle info is required").max(150),
  tireSize: z.string().trim().max(100).optional().or(z.literal("")),
  tpmsNeeded: z.boolean(),
  tpmsNotes: z.string().trim().max(300).optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

const MAX_FILES = 5;
const MAX_SIZE_MB = 10;

const QuoteForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [tpmsNeeded, setTpmsNeeded] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const incoming = Array.from(e.target.files ?? []);
    const valid = incoming.filter((f) => {
      if (!f.type.startsWith("image/")) {
        toast({ title: "Only images allowed", description: f.name, variant: "destructive" });
        return false;
      }
      if (f.size > MAX_SIZE_MB * 1024 * 1024) {
        toast({ title: "File too large", description: `${f.name} exceeds ${MAX_SIZE_MB}MB`, variant: "destructive" });
        return false;
      }
      return true;
    });
    const next = [...files, ...valid].slice(0, MAX_FILES);
    setFiles(next);
    e.target.value = "";
  };

  const removeFile = (idx: number) => setFiles(files.filter((_, i) => i !== idx));

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      vehicle: String(fd.get("vehicle") ?? ""),
      tireSize: String(fd.get("tireSize") ?? ""),
      tpmsNeeded,
      tpmsNotes: String(fd.get("tpmsNotes") ?? ""),
      message: String(fd.get("message") ?? ""),
    };

    const result = quoteSchema.safeParse(data);
    if (!result.success) {
      toast({
        title: "Please check the form",
        description: result.error.issues[0]?.message ?? "Some fields are invalid.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    // Front-end only for now — simulate submission
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);

    toast({
      title: "Quote request received",
      description: "We'll review your details and reach out shortly to confirm pricing and scheduling.",
    });

    (e.target as HTMLFormElement).reset();
    setTpmsNeeded(false);
    setFiles([]);
  };

  return (
    <section id="quote" className="py-20 md:py-28 bg-muted/30 border-y border-border">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <p className="text-sm font-medium text-primary uppercase tracking-wider">Request a quote</p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold text-balance">
              Tell us about your tires. We'll handle the rest.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Share a few details and snap photos of your tires, vehicle info, or sidewall sizing.
              We'll review and contact you to confirm pricing and a time that works.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-secondary" /> No obligation</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-secondary" /> Typical reply within one business day</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-secondary" /> Augusta & Rockingham County, VA</li>
            </ul>
          </div>

          <form onSubmit={onSubmit} className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-elegant space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input id="name" name="name" required maxLength={100} placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input id="phone" name="phone" type="tel" required maxLength={30} placeholder="(540) 555-0100" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" name="email" type="email" required maxLength={255} placeholder="you@example.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicle">Vehicle year, make & model *</Label>
              <Input id="vehicle" name="vehicle" required maxLength={150} placeholder="e.g. 2019 Honda CR-V" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tireSize">Current tire size / details</Label>
              <Input id="tireSize" name="tireSize" maxLength={100} placeholder="e.g. 235/60R18" />
            </div>

            <div className="rounded-lg border border-border bg-background/50 p-4 space-y-3">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="tpmsNeeded"
                  checked={tpmsNeeded}
                  onCheckedChange={(v) => setTpmsNeeded(v === true)}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <Label htmlFor="tpmsNeeded" className="cursor-pointer">I need TPMS service</Label>
                  <p className="text-xs text-muted-foreground mt-1">Sensor replacement, programming, or warning light.</p>
                </div>
              </div>
              {tpmsNeeded && (
                <Textarea
                  name="tpmsNotes"
                  maxLength={300}
                  placeholder="Tell us what's going on (warning light on, sensor age, etc.)"
                  rows={2}
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message / notes</Label>
              <Textarea id="message" name="message" maxLength={1000} rows={3} placeholder="Any other details, preferred times, or questions." />
            </div>

            <div className="space-y-2">
              <Label>Photos (optional)</Label>
              <label
                htmlFor="photos"
                className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-background/50 p-6 cursor-pointer hover:border-primary/40 hover:bg-background transition-colors"
              >
                <Upload className="h-6 w-6 text-muted-foreground" />
                <span className="text-sm font-medium">Tap to add photos</span>
                <span className="text-xs text-muted-foreground">Tires, vehicle info, sidewall sizing — up to {MAX_FILES} images, {MAX_SIZE_MB}MB each</span>
                <input
                  id="photos"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={onFileChange}
                />
              </label>
              {files.length > 0 && (
                <ul className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-2">
                  {files.map((f, i) => (
                    <li key={i} className="relative aspect-square rounded-md overflow-hidden border border-border">
                      <img src={URL.createObjectURL(f)} alt={f.name} className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeFile(i)}
                        className="absolute top-1 right-1 h-6 w-6 rounded-full bg-background/90 text-foreground flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                        aria-label={`Remove ${f.name}`}
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Button type="submit" variant="hero" size="xl" className="w-full" disabled={submitting}>
              {submitting ? "Sending..." : "Request a Quote"}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              We'll review your details and contact you soon to confirm pricing and scheduling.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default QuoteForm;
