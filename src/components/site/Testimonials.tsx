import { Star } from "lucide-react";

const items = [
  {
    quote: "They came to my office while I was in meetings. Walked out at lunch to four new tires. Absolute game-changer.",
    name: "Marcus T.",
    location: "Staunton, VA",
  },
  {
    quote: "Finally got my TPMS light fixed properly. Other shops kept resetting it — these folks actually programmed new sensors.",
    name: "Jenna R.",
    location: "Harrisonburg, VA",
  },
  {
    quote: "Quote was clear, scheduling was easy, and the trailer setup is legit. Felt like a real shop in my driveway.",
    name: "David L.",
    location: "Waynesboro, VA",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary uppercase tracking-wider">Customers</p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold text-balance">
            People who skipped the tire shop.
          </h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((t) => (
            <figure key={t.name} className="rounded-2xl border border-border bg-card p-6 flex flex-col">
              <div className="flex gap-0.5 text-secondary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 text-foreground/90 leading-relaxed flex-1">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="font-semibold">{t.name}</span>
                <span className="text-muted-foreground"> — {t.location}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
