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
      x: 20 + Math.random() * (containerWidth - 160),
      y: 10 + Math.random() * (containerHeight - 50),
      vx: (Math.random() - 0.5) * 0.75,
      vy: (Math.random() - 0.5) * 0.75,
      width: 130,
      height: 36,
    }));

    setBubbles(initialBubbles);

    const animate = () => {
      setBubbles((prevBubbles) => {
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;

        return prevBubbles.map((bubble) => {
          let { x, y, vx, vy, width, height } = bubble;

          // Gradually normalize velocity towards target speed of 0.8
          const currentSpeed = Math.sqrt(vx * vx + vy * vy);
          const targetSpeed = 0.8;
          if (currentSpeed > targetSpeed) {
            // Gradually slow down to target speed
            const decayFactor = 0.98;
            const newSpeed = Math.max(targetSpeed, currentSpeed * decayFactor);
            vx = (vx / currentSpeed) * newSpeed;
            vy = (vy / currentSpeed) * newSpeed;
          } else if (currentSpeed > 0 && currentSpeed < targetSpeed) {
            // Speed up to target speed
            vx = (vx / currentSpeed) * targetSpeed;
            vy = (vy / currentSpeed) * targetSpeed;
          }

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

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    setBubbles((prevBubbles) =>
      prevBubbles.map((bubble) => {
        // Calculate center of bubble
        const bubbleCenterX = bubble.x + bubble.width / 2;
        const bubbleCenterY = bubble.y + bubble.height / 2;

        // Calculate direction from click to bubble
        const dx = bubbleCenterX - clickX;
        const dy = bubbleCenterY - clickY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Normalize and apply force (closer bubbles get pushed harder)
        const force = Math.max(8, 150 / (distance + 1));
        const normalizedDx = dx / (distance || 1);
        const normalizedDy = dy / (distance || 1);

        return {
          ...bubble,
          vx: bubble.vx + normalizedDx * force,
          vy: bubble.vy + normalizedDy * force,
        };
      })
    );
  };

  return (
    <div className="bento-card animate-fade-up" style={{ animationDelay: "600ms" }} data-journey-whatido>
      <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">What I Do</h2>
      <div className="border-t border-border mb-3" />
      <div ref={containerRef} className="relative h-64 overflow-hidden cursor-pointer" onClick={handleContainerClick}>
        {skills.map((skill, index) => (
          <span
            key={skill.label}
            className={cn(
              "absolute shadow-sm text-xs font-medium whitespace-nowrap px-4 py-2 rounded-md",
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
