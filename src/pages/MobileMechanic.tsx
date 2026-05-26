import { useEffect } from "react";
import { Wrench, Droplet, Disc, Car, Gauge, BatteryCharging, Cog, Thermometer, ClipboardCheck, AlertTriangle } from "lucide-react";
import Navbar from "@/components/site/Navbar";
import { Contact, Footer } from "@/components/site/Contact";
import StickyCTA from "@/components/site/StickyCTA";
import MobileMechanicQuoteForm from "@/components/site/MobileMechanicQuoteForm";
import { Button } from "@/components/ui/button";
import { PHONE_DISPLAY, PHONE_TEL } from "@/components/site/Navbar";
import { Phone } from "lucide-react";

type Service = { icon: React.ComponentType<{ className?: string }>; title: string; desc: string };

const services: Service[] = [
  { icon: Droplet, title: "Oil changes", desc: "Full-service oil and filter changes at your home, office, or jobsite." },
  { icon: Disc, title: "Brake service", desc: "Pad and rotor replacement, brake inspections, and fluid service." },
  { icon: Car, title: "Suspension work", desc: "Shocks, struts, control arms, sway bar links, and related components." },
  { icon: Gauge, title: "Check engine light diagnostics", desc: "Code pulls plus deeper diagnostics to find the actual root cause." },
  { icon: Cog, title: "Engine tune-ups", desc: "Spark plugs, ignition coils, filters, and routine performance restoration." },
  { icon: BatteryCharging, title: "Battery replacement", desc: "Testing and replacement with quality batteries — installed on site." },
  { icon: Wrench, title: "Starter & alternator replacement", desc: "Charging and starting system repairs done in your driveway." },
  { icon: Thermometer, title: "Radiator replacement", desc: "Radiator, hose, and cooling system repairs to prevent overheating." },
  { icon: ClipboardCheck, title: "General maintenance", desc: "Fluids, filters, belts, and scheduled service to keep things reliable." },
  
];

const MobileMechanic = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: "Wheels on Wheels — Mobile Mechanic",
    description:
      "On-site mobile auto repair and maintenance in Augusta & Rockingham County, VA. Oil changes, brakes, suspension, diagnostics, batteries, and more — at your location.",
    telephone: "+1-540-458-4737",
    areaServed: ["Augusta County, VA", "Rockingham County, VA"],
    serviceType: [
      "Mobile oil change",
      "Mobile brake service",
      "Suspension repair",
      "Check engine light diagnostics",
      "Engine tune-up",
      "Battery replacement",
      "Starter and alternator replacement",
      "Radiator replacement",
      "General maintenance",
      "Diagnostic scans",
    ],
  };

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Mobile Mechanic Services | On-Site Auto Repair — Wheels on Wheels";

    const setMeta = (selector: string, attr: string, value: string, create?: () => HTMLElement) => {
      let el = document.head.querySelector<HTMLElement>(selector);
      if (!el && create) {
        el = create();
        document.head.appendChild(el);
      }
      el?.setAttribute(attr, value);
      return el;
    };

    const desc = "On-site mobile mechanic services in Augusta & Rockingham County, VA. Oil changes, brakes, suspension, diagnostics, batteries, and more — performed at your location.";
    setMeta('meta[name="description"]', "content", desc, () => {
      const m = document.createElement("meta");
      m.setAttribute("name", "description");
      return m;
    });
    setMeta('link[rel="canonical"]', "href", "https://wowtires.com/mobile-mechanic", () => {
      const l = document.createElement("link");
      l.setAttribute("rel", "canonical");
      return l;
    });

    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.text = JSON.stringify(jsonLd);
    ld.dataset.page = "mobile-mechanic";
    document.head.appendChild(ld);

    return () => {
      document.title = prevTitle;
      document.head.querySelectorAll('script[data-page="mobile-mechanic"]').forEach((n) => n.remove());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">

      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative bg-hero pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28 overflow-hidden">
          <div className="container relative">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-primary uppercase tracking-wider">Mobile Mechanic</p>
              <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] text-balance">
                On-Site Mobile <span className="text-primary">Auto Repair</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed">
                Skip the shop. We bring convenient automotive repair and maintenance directly to your
                home, office, or jobsite - performed by an experienced technician with the right tools
                for the job.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button asChild variant="hero" size="xl">
                  <a href="#quote">Request a Quote</a>
                </Button>
                <Button asChild variant="outlineLight" size="xl">
                  <a href={`tel:${PHONE_TEL}`} className="gap-2">
                    <Phone className="h-5 w-5" />
                    Call/Text {PHONE_DISPLAY}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-16 md:py-20 border-t border-border">
          <div className="container grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <p className="text-sm font-medium text-primary uppercase tracking-wider">Convenient repair</p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-balance">
                Repairs and maintenance, performed where you are.
              </h2>
            </div>
            <p className="lg:col-span-7 text-muted-foreground leading-relaxed text-lg">
              Our mobile mechanic service handles a wide range of automotive repair and routine
              maintenance — without the wait, the tow, or the trip to a shop. From quick oil changes
              and battery swaps to brake jobs and check engine diagnostics, we come fully equipped to
              get the job done at your location.
            </p>
          </div>
        </section>

        {/* Services grid */}
        <section id="services" className="py-20 md:py-28 bg-muted/30 border-y border-border">
          <div className="container">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-primary uppercase tracking-wider">Services</p>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold text-balance">
                What we work on.
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                A focused list of the mobile mechanic services we offer. If you don't see your issue
                listed, give us a call or send a quote request — we'll let you know if it's something
                we can take on.
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <article key={s.title} className="rounded-2xl border border-border bg-card p-6">
                  <div className="h-11 w-11 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </article>
              ))}
            </div>

            {/* Important notice */}
            <div className="mt-12 rounded-2xl border-2 border-primary bg-primary/10 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
              <div className="h-12 w-12 shrink-0 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <span className="inline-flex items-center rounded-full bg-primary text-primary-foreground px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  Important notice
                </span>
                <h3 className="mt-3 text-xl sm:text-2xl font-semibold">
                  Customer-supplied parts are NOT allowed.
                </h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  We only install parts sourced directly through our approved suppliers. This ensures
                  quality, warranty coverage, and correct parts for every job.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quote form (mobile mechanic specific) */}
        <MobileMechanicQuoteForm />

        <Contact />
      </main>

      <Footer />
      <StickyCTA />
    </div>
  );
};

export default MobileMechanic;
