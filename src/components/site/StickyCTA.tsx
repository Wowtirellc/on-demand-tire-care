import { Phone } from "lucide-react";
import { PHONE_TEL } from "./Navbar";

const StickyCTA = () => {
  return (
    <div className="fixed bottom-4 inset-x-4 z-30 sm:hidden">
      <div className="flex gap-2 rounded-full border border-border bg-background/95 backdrop-blur p-2 shadow-elegant">
        <a
          href="#quote"
          className="flex-1 inline-flex items-center justify-center rounded-full bg-gradient-accent text-primary-foreground font-semibold py-3 text-sm shadow-red"
        >
          Get a Quote
        </a>
        <a
          href={`tel:${PHONE_TEL}`}
          aria-label="Call now"
          className="inline-flex items-center justify-center rounded-full bg-secondary text-secondary-foreground font-semibold px-5 py-3 text-sm"
        >
          <Phone className="h-4 w-4 mr-1.5" />
          Call
        </a>
      </div>
    </div>
  );
};

export default StickyCTA;
