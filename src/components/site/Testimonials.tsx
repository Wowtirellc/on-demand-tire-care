import { Star } from "lucide-react";

const items = [
  "I completed the quote online and within half an hour we were texting; within another hour he was at my residence with the new tires",
  "BRUH! I wish my marriage was this easy",
  "I continued with my yard work while he was working. VERY convenient",
  "Great price and communication. Will use again",
];

const Testimonials = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary uppercase tracking-wider">Reviews</p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold text-balance">
            People who skipped the tire shop.
          </h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {items.map((quote, i) => (
            <figure key={i} className="rounded-2xl border border-border bg-card p-6 flex flex-col">
              <div className="flex gap-0.5 text-secondary">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 text-foreground/90 leading-relaxed flex-1">
                "{quote}"
              </blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
