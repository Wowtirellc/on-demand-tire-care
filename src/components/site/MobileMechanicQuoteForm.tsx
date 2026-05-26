import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const quoteSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(7, "Phone is required").max(30),
  email: z.string().trim().email("Invalid email").max(255),
  vehicle: z.string().trim().min(1, "Vehicle info is required").max(150),
  service: z.string().trim().min(1, "Requested service is required").max(150),
  issue: z.string().trim().min(1, "Please describe the issue").max(1000),
  preferredTime: z.string().trim().max(150).optional().or(z.literal("")),
  location: z.string().trim().min(1, "Service location is required").max(250),
});

const MobileMechanicQuoteForm = () => {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      vehicle: String(fd.get("vehicle") ?? ""),
      service: String(fd.get("service") ?? ""),
      issue: String(fd.get("issue") ?? ""),
      preferredTime: String(fd.get("preferredTime") ?? ""),
      location: String(fd.get("location") ?? ""),
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

    const combinedMessage = [
      `Requested service: ${data.service}`,
      `Issue / repair needed: ${data.issue}`,
      data.preferredTime ? `Preferred appointment time: ${data.preferredTime}` : null,
      `Service location: ${data.location}`,
      `Source: Mobile Mechanic page`,
    ]
      .filter(Boolean)
      .join("\n");

    setSubmitting(true);
    try {
      const { error: dbError } = await supabase.from("quote_requests").insert({
        name: data.name,
        phone: data.phone,
        email: data.email,
        vehicle: data.vehicle,
        tire_size: null,
        tpms_needed: false,
        tpms_notes: null,
        message: combinedMessage,
      });
      if (dbError) throw dbError;

      const { error: fnError } = await supabase.functions.invoke("send-quote-email", {
        body: {
          name: data.name,
          phone: data.phone,
          email: data.email,
          vehicle: data.vehicle,
          tpmsNeeded: false,
          message: combinedMessage,
        },
      });
      if (fnError) throw fnError;

      toast({
        title: "Request received",
        description: "We'll review your details and reach out shortly to confirm pricing and scheduling.",
      });

      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error("Mobile mechanic quote submission error:", err);
      toast({
        title: "Couldn't send your request",
        description: "Please try again, or call us directly.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="quote" className="py-20 md:py-28 bg-muted/30 border-y border-border">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <p className="text-sm font-medium text-primary uppercase tracking-wider">Request a quote</p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold text-balance">
              Request Mobile Mechanic Service Quote
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Ready to skip the shop waiting room? Tell us what repair or maintenance service you
              need and we'll contact you with pricing and availability.
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
                <Label htmlFor="phone">Phone number *</Label>
                <Input id="phone" name="phone" type="tel" required maxLength={30} placeholder="(540) 555-0100" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" name="email" type="email" required maxLength={255} placeholder="you@example.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicle">Vehicle year, make & model *</Label>
              <Input id="vehicle" name="vehicle" required maxLength={150} placeholder="e.g. 2018 Toyota Tacoma SR5" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="service">Requested service *</Label>
              <Input id="service" name="service" required maxLength={150} placeholder="e.g. Oil change, brake pads, check engine diagnostic" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="issue">Describe the issue or repair needed *</Label>
              <Textarea
                id="issue"
                name="issue"
                required
                maxLength={1000}
                rows={4}
                placeholder="Symptoms, noises, warning lights, when it started, anything we should know."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredTime">Preferred appointment time</Label>
              <Input
                id="preferredTime"
                name="preferredTime"
                maxLength={150}
                placeholder="e.g. Weekday mornings, Saturday afternoon"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Address / service location *</Label>
              <Textarea
                id="location"
                name="location"
                required
                maxLength={250}
                rows={2}
                placeholder="Street address where the vehicle will be serviced (home, office, or jobsite)."
              />
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

export default MobileMechanicQuoteForm;
