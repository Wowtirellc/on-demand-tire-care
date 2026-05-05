import { Button } from "@/components/ui/button";
import { Phone, MapPin, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import heroTrailer from "@/assets/hero-truck-trailer.jpeg";
import heroInterior from "@/assets/hero-trailer-interior.jpeg";
import heroLift from "@/assets/hero-suv-lift.jpg";
const heroOriginal = "/hero-trailer-new.png";
import { PHONE_DISPLAY, PHONE_TEL } from "./Navbar";

const heroImages = [
  { src: heroOriginal, alt: "Wheels on Wheels technician replacing a tire from a service trailer in a customer's driveway" },
  { src: heroTrailer, alt: "Wheels on Wheels branded truck and mobile tire service trailer" },
  { src: heroInterior, alt: "Inside the mobile tire service trailer with professional tire changer and balancer" },
  { src: heroLift, alt: "SUV raised on a mobile lift for tire service" },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % heroImages.length), 18000);
    return () => clearInterval(id);
  }, []);
  return (
    <section id="top" className="relative bg-hero pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28 overflow-hidden">
      <div className="container relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.05] text-balance">
              Bringing Tire Service <span className="text-primary">to You.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Professional tire replacement and TPMS sensor service at your home or workplace. Skip the tire shop we bring the tire service to you!
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
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-elegant ring-1 ring-border relative">
                {heroImages.map((img, i) => (
                  <img
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    width={1920}
                    height={1440}
                    loading={i === 0 ? "eager" : "lazy"}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`}
                  />
                ))}
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
