import { Phone } from "lucide-react";

const PHONE_DISPLAY = "540-45-TIRES";
const PHONE_TEL = "5404584737"; // 540-458-4737

const Navbar = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/60">
      <div className="container flex h-32 items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <img
            src="/logo.svg"
            alt="Wheels on Wheels logo"
            className="h-[7.5rem] w-[7.5rem] object-contain"
          />
          <span className="font-display text-lg sm:text-xl tracking-tight">
            Wheels <span className="text-secondary">on</span> Wheels
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          <a href="#how" className="hover:text-foreground transition-colors">How it works</a>
          <a href="#services" className="hover:text-foreground transition-colors">Services</a>
          <a href="#why" className="hover:text-foreground transition-colors">Why us</a>
          <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
        </nav>
        <a
          href={`tel:${PHONE_TEL}`}
          className="hidden sm:inline-flex items-center gap-2 rounded-md border border-secondary/50 px-3 py-2 text-sm font-medium text-secondary hover:bg-secondary/10 transition-colors"
        >
          <Phone className="h-4 w-4" />
          {PHONE_DISPLAY}
        </a>
      </div>
    </header>
  );
};

export default Navbar;
export { PHONE_DISPLAY, PHONE_TEL };
