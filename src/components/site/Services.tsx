import { Gauge, Settings2, PackageCheck, Scale, Truck } from "lucide-react";
import tpmsImage from "@/assets/tpms-new.jpg";
import tireIcon from "@/assets/icon-tire.png";
import tpmsIcon from "@/assets/icon-tpms.png";
import tpmsIconRed from "@/assets/icon-tpms-red.png";

type Service = {
  icon?: React.ComponentType<{ className?: string }>;
  image?: string;
  title: string;
  desc: string;
};

const services: Service[] = [
  { icon: Truck, title: "Mobile tire replacement", desc: "Full tire swap-outs at your driveway, parking lot, or jobsite." },
  { icon: Scale, title: "Mounting & balancing", desc: "Computer balancing on professional shop-grade equipment." },
  { image: tpmsIcon, title: "TPMS sensor replacement", desc: "Replace failed/dying TPMS sensors with AUTEL genuine tire pressure sensors with warranty." },
  { icon: Settings2, title: "TPMS programming & relearn", desc: "Sensor programming and vehicle relearn so warning lights stay off." },
  { icon: PackageCheck, title: "Customer-supplied tires", desc: "We sell most major and minor tire brands. Found a better price or a tire we cant source? We will gladly install them!" },
  { image: tireIcon, title: "Tire rotation & inspection", desc: "Quick rotations and visual inspections while we're on site." },
];

const Services = () => {
  return (
    <section id="services" className="py-20 md:py-28 bg-muted/30 border-y border-border">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <p className="text-sm font-medium text-primary uppercase tracking-wider">Services</p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold text-balance">
              Everything a tire shop does - at your address.
            </h2>
          </div>
          <p className="lg:col-span-5 text-muted-foreground leading-relaxed">
            From new tire installs to TPMS sensor programming, we handle the full job on site so
            you never have to sit in a waiting room.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.title}
              className="group rounded-2xl border border-border bg-card p-6 hover:border-secondary/40 hover:-translate-y-0.5 transition-all"
            >
              <div className="h-11 w-11 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                {s.image ? (
                  <img src={s.image} alt="" className="h-7 w-7 object-contain" />
                ) : s.icon ? (
                  <s.icon className="h-5 w-5" />
                ) : null}
              </div>
              <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </article>
          ))}
        </div>

        {/* TPMS feature strip */}
        <div className="mt-16 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center rounded-3xl border border-border bg-card overflow-hidden">
          <div className="aspect-[4/3] lg:aspect-auto lg:h-full">
            <img
              src={tpmsImage}
              alt="Technician programming a TPMS tire pressure sensor with a diagnostic tool"
              loading="lazy"
              width={1024}
              height={1024}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-8 lg:p-12">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium uppercase tracking-wider">
              <img src={tpmsIconRed} alt="" className="h-4 w-4 object-contain" />
              TPMS expertise
            </span>
            <h3 className="mt-4 text-2xl sm:text-3xl font-semibold">
              That dashboard light? We make it disappear — properly.
            </h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              TPMS sensors fail every 5–10 years and require programming and a vehicle relearn after
              replacement. We install only AUTEL genuine TPMS sensors with 3 year warranty, so you
              drive away without warning lights or guesswork.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
