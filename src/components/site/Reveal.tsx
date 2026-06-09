import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "fade" | "scale" | "left" | "right";
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

const Reveal = ({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 700,
  threshold = 0.1,
  once = true,
}: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  const baseStyles: React.CSSProperties = {
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
  };

  const variants = {
    up: isVisible
      ? { opacity: 1, transform: "translateY(0)" }
      : { opacity: 0, transform: "translateY(40px)" },
    fade: isVisible
      ? { opacity: 1, transform: "none" }
      : { opacity: 0, transform: "none" },
    scale: isVisible
      ? { opacity: 1, transform: "scale(1)" }
      : { opacity: 0, transform: "scale(0.96)" },
    left: isVisible
      ? { opacity: 1, transform: "translateX(0)" }
      : { opacity: 0, transform: "translateX(-40px)" },
    right: isVisible
      ? { opacity: 1, transform: "translateX(0)" }
      : { opacity: 0, transform: "translateX(40px)" },
  };

  return (
    <div
      ref={ref}
      className={cn("will-change-transform", className)}
      style={{
        ...baseStyles,
        ...variants[direction],
        transitionProperty: "opacity, transform",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {children}
    </div>
  );
};

export default Reveal;
