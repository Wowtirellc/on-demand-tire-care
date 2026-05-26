import { Button } from "@/components/ui/button";
import { Phone, MapPin, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import heroTrailer from "@/assets/hero-truck-trailer.jpeg";
import heroInterior from "@/assets/hero-trailer-interior.jpeg";
import heroLift from "@/assets/hero-suv-lift.jpg";
import heroPorsche from "@/assets/hero-porsche-wheel.jpeg";
const heroOriginal = "/hero-trailer-new.png";
import { PHONE_DISPLAY, PHONE_TEL } from "./Navbar";

const heroImages = [
  { src: heroOriginal, alt: "Wheels on Wheels technician replacing a tire from a service trailer in a customer's driveway" },
  { src: heroTrailer, alt: "Wheels on Wheels branded truck and mobile tire service trailer" },
  { src: heroInterior, alt: "Inside the mobile tire service trailer with professional tire changer and balancer" },
  { src: heroLift, alt: "SUV raised on a mobile lift for tire service" },
  { src: heroPorsche, alt: "Freshly mounted Yokohama Geolandar tire on a Porsche alloy wheel during mobile service" },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setCurrent((c) => (c + 1) % heroImages.length), 15000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const goTo = (index: number) => {
    setCurrent(index);
    startTimer();
  };

  const next = () => goTo((current + 1) % heroImages.length);
  const prev = () => goTo((current - 1 + heroImages.length) % heroImages.length);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) next();
      else prev();
    }
  };

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
              <div
                className="aspect-[4/3] rounded-2xl overflow-hidden shadow-elegant ring-1 ring-border relative cursor-pointer select-none"
                onClick={next}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
                role="button"
                aria-label="Next image"
              >
                {heroImages.map((img, i) => (
                  <img
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    width={1920}
                    height={1440}
                    loading={i === 0 ? "eager" : "lazy"}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`}
                    draggable={false}
                  />
                ))}

                <button
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                  {heroImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); goTo(i); }}
                      className={`h-2 rounded-full transition-all ${i === current ? "w-6 bg-white" : "w-2 bg-white/60 hover:bg-white/80"}`}
                      aria-label={`Go to image ${i + 1}`}
                    />
                  ))}
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
