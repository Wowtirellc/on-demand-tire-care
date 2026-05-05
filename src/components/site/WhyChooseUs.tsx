import { Home, Clock, CalendarRange, ReceiptText, ShieldCheck } from "lucide-react";
import tpmsIconRed from "@/assets/icon-tpms-red.png";

type Reason = {
  icon?: React.ComponentType<{ className?: string }>;
  image?: string;
  title: string;
  desc: string;
};

const reasons: Reason[] = [
  { icon: Home, title: "We come to you", desc: "Home, office, or jobsite - your driveway becomes the shop." },
  { icon: Clock, title: "No waiting rooms", desc: "Skip the lobby. Keep working, parenting, or relaxing." },
  { icon: CalendarRange, title: "Flexible scheduling", desc: "Available most days in the week, even some saturdays!" },
  { image: tpmsIconRed, title: "TPMS expertise", desc: "Sensors replaced and programmed - no more annoying warning light." },
  { icon: ReceiptText, title: "Transparent quotes", desc: "Clear pricing up front. All service fees, taxes, and disposal fees listed on quotes." },
  { icon: ShieldCheck, title: "Professional setup", desc: "The same professional tools and equipment you would find in a tire shop, Brought to you!" },
];

const WhyChooseUs = () => {
  return (
    <section id="why" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary uppercase tracking-wider">Why choose us</p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold text-balance">
            The convenience of mobile, the precision of a shop.
          </h2>
        </div>

        <ul className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r) => (
            <li key={r.title} className="flex gap-4">
              <div className="shrink-0 h-11 w-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                {r.image ? (
                  <img src={r.image} alt="" className="h-[1.8rem] w-[1.8rem] object-contain" />
                ) : r.icon ? (
                  <r.icon className="h-5 w-5" />
                ) : null}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{r.title}</h3>
                <p className="mt-1 text-muted-foreground leading-relaxed">{r.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WhyChooseUs;
