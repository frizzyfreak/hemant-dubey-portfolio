import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

const skills = [
  { label: "Machine Learning", color: "bg-pastel-lavender text-foreground" },
  { label: "Building Agentic Models", color: "bg-pastel-blue text-foreground" },
  { label: "Data Pipelines", color: "bg-pastel-mint text-foreground" },
  { label: "Product Management", color: "bg-pastel-orange text-foreground" },
  { label: "Predictive Modeling", color: "bg-pastel-pink text-foreground" },
  { label: "SaaS Development", color: "bg-pastel-yellow text-foreground" },
];

interface Bubble {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
}

const WhatIDoCard = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    // Initialize bubbles with random positions and velocities (reduced speed)
    const initialBubbles: Bubble[] = skills.map((_, index) => ({
      x: 20 + Math.random() * (containerWidth - 140),
      y: 10 + Math.random() * (containerHeight - 40),
      vx: (Math.random() - 0.5) * 0.75,
      vy: (Math.random() - 0.5) * 0.75,
      width: 100,
      height: 28,
    }));

    setBubbles(initialBubbles);

    const animate = () => {
      setBubbles((prevBubbles) => {
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;

        return prevBubbles.map((bubble) => {
          let { x, y, vx, vy, width, height } = bubble;

          // Update position
          x += vx;
          y += vy;

          // Bounce off walls (Newton's third law - reverse velocity)
          if (x <= 0) {
            x = 0;
            vx = Math.abs(vx);
          } else if (x + width >= containerWidth) {
            x = containerWidth - width;
            vx = -Math.abs(vx);
          }

          if (y <= 0) {
            y = 0;
            vy = Math.abs(vy);
          } else if (y + height >= containerHeight) {
            y = containerHeight - height;
            vy = -Math.abs(vy);
          }

          return { x, y, vx, vy, width, height };
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="bento-card animate-fade-up" style={{ animationDelay: "600ms" }}>
      <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">What I Do</h2>
      <div className="border-t border-border mb-3" />
      <div ref={containerRef} className="relative h-64 overflow-hidden">
        {skills.map((skill, index) => (
          <span
            key={skill.label}
            className={cn(
              "skill-tag absolute shadow-sm text-[10px] whitespace-nowrap",
              skill.color
            )}
            style={{
              transform: bubbles[index]
                ? `translate(${bubbles[index].x}px, ${bubbles[index].y}px)`
                : `translate(${20 + index * 10}px, ${10 + index * 30}px)`,
              transition: "none",
            }}
          >
            {skill.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default WhatIDoCard;
