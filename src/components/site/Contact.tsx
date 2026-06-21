import { Phone, Mail, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PHONE_DISPLAY, PHONE_TEL } from "./Navbar";
import Reveal from "./Reveal";
import RevealGroup from "./RevealGroup";

const Contact = () => {
  return (
    <section id="contact" className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/40 border-t border-border">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal direction="left">
            <div>
              <p className="text-sm font-medium text-primary uppercase tracking-wider">Contact</p>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold text-balance">
                Ready to skip the tire shop?
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed max-w-lg">
                Send a quote request or reach us directly. We'll get you on the schedule fast.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button asChild variant="hero" size="xl">
                  <a href="#quote">Get a Quote</a>
                </Button>
                <Button asChild variant="outlineLight" size="xl">
                  <a href={`tel:${PHONE_TEL}`} className="gap-2">
                    <Phone className="h-5 w-5" />
                    Call/Text {PHONE_DISPLAY}
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>

          <RevealGroup className="grid sm:grid-cols-2 gap-4" direction="up" staggerDelay={100}>
            <div className="rounded-2xl border border-border bg-card p-6 h-full flex flex-col">
              <Phone className="h-5 w-5 text-secondary" />
              <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">Phone / Text</p>
              <a href={`tel:${PHONE_TEL}`} className="mt-1 block text-lg font-semibold hover:text-primary transition-colors">
                {PHONE_DISPLAY}
              </a>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 h-full flex flex-col">
              <Clock className="h-5 w-5 text-secondary" />
              <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">Hours</p>
              <p className="mt-1 text-base font-medium">Mon–Sat · 9am–5pm</p>
              <p className="text-sm text-muted-foreground"></p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 h-full flex flex-col">
              <MapPin className="h-5 w-5 text-secondary" />
              <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">Service area</p>
              <p className="mt-1 text-base font-medium">Augusta & Rockingham County, VA</p>
            </div>
          </RevealGroup>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="border-t border-border bg-background py-10">
      <div className="container flex items-center justify-center sm:justify-end gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Wheels on Wheels LLC. All rights reserved.</p>
      </div>
  </footer>
);

export { Contact, Footer };
