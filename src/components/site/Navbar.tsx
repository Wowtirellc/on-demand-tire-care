import { useState } from "react";
import { Phone, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

const PHONE_DISPLAY = "540-45-TIRES";
const PHONE_TEL = "5404584737"; // 540-458-4737

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#how", label: "How it works" },
  { href: "/#why", label: "Why us" },
  { href: "/#faq", label: "FAQ" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/60">
      <div className="container flex h-20 lg:h-32 items-center justify-between">
        <a href="#top" className="flex items-center gap-2 shrink-0">
          <img
            src="/logo.png"
            alt="Wheels on Wheels logo"
            className="h-12 w-12 lg:h-[7.5rem] lg:w-[7.5rem] object-contain"
          />
          <img
            src="/wheels-on-wheels-text.png"
            alt="Wheels on Wheels - Mobile Tire Shop"
            className="h-14 w-14 lg:h-[8.625rem] lg:w-[8.625rem] object-contain"
          />
        </a>

        {/* Desktop nav — lg and up */}
        <nav className="hidden lg:flex items-center gap-7 text-sm text-muted-foreground">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-foreground transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${PHONE_TEL}`}
            className="hidden sm:inline-flex items-center gap-2 rounded-md border border-secondary/50 px-3 py-2 text-sm font-medium text-secondary hover:bg-secondary/10 transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden md:inline">{PHONE_DISPLAY}</span>
          </a>

          {/* Hamburger — lg and below */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <a
                      href={link.href}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </a>
                  </SheetClose>
                ))}
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="inline-flex items-center gap-2 rounded-md border border-secondary/50 px-4 py-3 text-sm font-medium text-secondary hover:bg-secondary/10 transition-colors mt-4"
                >
                  <Phone className="h-4 w-4" />
                  {PHONE_DISPLAY}
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
export { PHONE_DISPLAY, PHONE_TEL };
