import { Button } from "@/components/ui/button";
import { Phone, MapPin, Clock } from "lucide-react";
import heroImage from "@/assets/hero-trailer.jpg";
import { PHONE_DISPLAY, PHONE_TEL } from "./Navbar";

const Hero = () => {
  return (
    <section id="top" className="relative bg-hero pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28 overflow-hidden">
      <div className="container relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
              Scheduled mobile tire service — not roadside
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.05] text-balance">
              Bringing Tire Service <span className="text-primary">to You.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Professional tire replacement and TPMS sensor service at your home or workplace.
              Skip the tire shop — we bring the trailer to your driveway.
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

            <dl className="mt-10 grid grid-cols-2 gap-4 max-w-md">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-secondary mt-0.5" />
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">Service area</dt>
                  <dd className="text-sm font-medium">Augusta & Rockingham, VA</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-secondary mt-0.5" />
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">Typical job</dt>
                  <dd className="text-sm font-medium">Under 2 hours</dd>
                </div>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-6">
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-elegant ring-1 ring-border">
                <img
                  src={heroImage}
                  alt="Wheels on Wheels technician replacing a tire from a service trailer in a customer's driveway"
                  width={1920}
                  height={1080}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-4 sm:left-6 bg-card border border-border rounded-xl p-4 shadow-elegant max-w-[260px]">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gradient-yellow flex items-center justify-center text-secondary-foreground font-display text-lg">
                    W
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-tight">TPMS specialists</p>
                    <p className="text-xs text-muted-foreground">No warning lights left behind</p>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
