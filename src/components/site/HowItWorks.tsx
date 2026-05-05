import { ClipboardList, CalendarCheck, Wrench } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Share vehicle details",
    desc: "Tell us about your vehicle, tire size, and any TPMS needs through our quote form.",
  },
  {
    icon: CalendarCheck,
    title: "Schedule",
    desc: "We confirm pricing and pick a time that fits your day - at home or work.",
  },
  {
    icon: Wrench,
    title: "We come to you",
    desc: "Our mobile tire shop comes to you at the scheduled time and we take care of all scheduled tire needs.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary uppercase tracking-wider">How it works</p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold text-balance">
            Three simple steps. Zero shop waiting rooms.
          </h2>
        </div>

        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="relative rounded-2xl border border-border bg-card p-7"
            >
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <step.icon className="h-6 w-6" />
                </div>
                <span className="font-display text-5xl text-secondary/30">0{i + 1}</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed text-sm">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default HowItWorks;
