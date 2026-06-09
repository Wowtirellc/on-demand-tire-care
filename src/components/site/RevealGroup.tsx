import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RevealGroupProps {
  children: React.ReactNode;
  className?: string;
  childClassName?: string;
  direction?: "up" | "fade" | "scale" | "left" | "right";
  staggerDelay?: number;
  baseDelay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

const RevealGroup = ({
  children,
  className,
  childClassName,
  direction = "up",
  staggerDelay = 100,
  baseDelay = 0,
  duration = 700,
  threshold = 0.1,
  once = true,
}: RevealGroupProps) => {
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

  const childrenArray = Array.isArray(children) ? children : [children];

  const variants = {
    up: (visible: boolean) =>
      visible
        ? { opacity: 1, transform: "translateY(0)" }
        : { opacity: 0, transform: "translateY(40px)" },
    fade: (visible: boolean) =>
      visible
        ? { opacity: 1, transform: "none" }
        : { opacity: 0, transform: "none" },
    scale: (visible: boolean) =>
      visible
        ? { opacity: 1, transform: "scale(1)" }
        : { opacity: 0, transform: "scale(0.96)" },
    left: (visible: boolean) =>
      visible
        ? { opacity: 1, transform: "translateX(0)" }
        : { opacity: 0, transform: "translateX(-40px)" },
    right: (visible: boolean) =>
      visible
        ? { opacity: 1, transform: "translateX(0)" }
        : { opacity: 0, transform: "translateX(40px)" },
  };

  return (
    <div ref={ref} className={className}>
      {childrenArray.map((child, i) => (
        <div
          key={i}
          className={cn("will-change-transform", childClassName)}
          style={{
            ...variants[direction](isVisible),
            transitionProperty: "opacity, transform",
            transitionDuration: `${duration}ms`,
            transitionDelay: `${baseDelay + i * staggerDelay}ms`,
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default RevealGroup;
