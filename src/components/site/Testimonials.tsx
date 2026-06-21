import { useEffect, useMemo, useState } from "react";
import { Star } from "lucide-react";

const items = [
  "I completed the quote online and within half an hour we were texting; within another hour he was at my residence with the new tires",
  "BRUH! I wish my marriage was this easy",
  "I continued with my yard work while he was working. VERY convenient",
  "Great price and communication. Will use again",
];

const shuffle = <T,>(arr: T[]) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const Testimonials = () => {
  const order = useMemo(() => shuffle(items.map((_, i) => i)), []);
  const [pos, setPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setPos((p) => (p + 1) % order.length);
        setVisible(true);
      }, 350);
    }, 9000);
    return () => clearInterval(interval);
  }, [order.length]);

  const quote = items[order[pos]];

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm font-medium text-primary uppercase tracking-wider">Reviews</p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold text-balance">
            People who skipped the tire shop.
          </h2>
        </div>
        <div className="mt-12 max-w-3xl mx-auto">
          <figure
            className={`rounded-2xl border border-border bg-card p-8 md:p-10 flex flex-col items-center text-center min-h-[220px] transition-opacity duration-300 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex gap-0.5 text-secondary">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <blockquote className="mt-5 text-lg md:text-xl text-foreground/90 leading-relaxed">
              "{quote}"
            </blockquote>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
