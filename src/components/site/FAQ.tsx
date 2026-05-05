import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "Is this roadside assistance?",
    a: "No. We're a scheduled mobile tire service. We come to your home or workplace at a time you choose — we don't operate as a roadside emergency service.",
  },
  {
    q: "Do you handle TPMS warning lights?",
    a: "Yes. We replace failed TPMS sensors and program them to your vehicle, including the relearn procedure, so you drive away with no warning lights.",
  },
  {
    q: "Do I need to supply tires?",
    a: "We sell tires from most major and minor brands, but if your heart is set on a exotic, rare, or discontinued new tires that we can not source we will gladly install them for you!",
  },
  {
    q: "How long does service take?",
    a: "Most jobs take less than 2 hours from arrival to wrap-up. We'll give you a clear time estimate when we confirm your appointment.",
  },
  {
    q: "What areas do you cover?",
    a: "Augusta and Rockingham County, Virginia. If you're nearby, ask - we'll let you know.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We prefer cash/check but also accept all major credit and debit cards. We can take payment in person with tap to pay cards, Apple Pay, or Google Wallet, or you can pay online for even more payment methods like Cashapp (2% processing fee for all non cash payment options)",
  },
  {
    q: "Do you do oil changes and brake work?",
    a: "No we are not authorized to handle hazardous waste like oil, anti-freeze, or brake fluid. Our primary focus is providing affordable and convenient tire replacements/service",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 md:py-28 bg-muted/30 border-y border-border">
      <div className="container max-w-4xl">
        <div className="text-center">
          <p className="text-sm font-medium text-primary uppercase tracking-wider">FAQ</p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold text-balance">
            Common questions, answered.
          </h2>
        </div>
        <Accordion type="single" collapsible className="mt-12">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-left text-base sm:text-lg font-semibold hover:no-underline hover:text-primary">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
