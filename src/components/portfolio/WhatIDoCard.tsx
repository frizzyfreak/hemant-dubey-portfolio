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
  const bubblesRef = useRef<Bubble[]>([]);
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const bubbleElements = container.querySelectorAll('.bubble-tag');
    
    // Initialize bubbles with random positions and velocities
    const initialBubbles: Bubble[] = [];
    bubbleElements.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      initialBubbles.push({
        x: Math.random() * (containerRect.width - rect.width),
        y: Math.random() * (containerRect.height - rect.height),
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        width: rect.width,
        height: rect.height,
      });
    });
    
    bubblesRef.current = initialBubbles;
    setPositions(initialBubbles.map(b => ({ x: b.x, y: b.y })));

    const animate = () => {
      const bubbles = bubblesRef.current;
      const containerWidth = containerRect.width;
      const containerHeight = containerRect.height;

      // Update positions
      bubbles.forEach((bubble, i) => {
        bubble.x += bubble.vx;
        bubble.y += bubble.vy;

        // Wall collisions
        if (bubble.x <= 0 || bubble.x + bubble.width >= containerWidth) {
          bubble.vx *= -1;
          bubble.x = Math.max(0, Math.min(bubble.x, containerWidth - bubble.width));
        }
        if (bubble.y <= 0 || bubble.y + bubble.height >= containerHeight) {
          bubble.vy *= -1;
          bubble.y = Math.max(0, Math.min(bubble.y, containerHeight - bubble.height));
        }

        // Bubble-to-bubble collisions
        for (let j = i + 1; j < bubbles.length; j++) {
          const other = bubbles[j];
          const dx = (bubble.x + bubble.width / 2) - (other.x + other.width / 2);
          const dy = (bubble.y + bubble.height / 2) - (other.y + other.height / 2);
          const minDist = (bubble.width + other.width) / 2;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < minDist && dist > 0) {
            // Collision detected - swap velocities
            const nx = dx / dist;
            const ny = dy / dist;
            const dvx = bubble.vx - other.vx;
            const dvy = bubble.vy - other.vy;
            const dvn = dvx * nx + dvy * ny;

            if (dvn > 0) {
              bubble.vx -= dvn * nx * 0.8;
              bubble.vy -= dvn * ny * 0.8;
              other.vx += dvn * nx * 0.8;
              other.vy += dvn * ny * 0.8;

              // Separate overlapping bubbles
              const overlap = minDist - dist;
              bubble.x += nx * overlap / 2;
              bubble.y += ny * overlap / 2;
              other.x -= nx * overlap / 2;
              other.y -= ny * overlap / 2;
            }
          }
        }

        // Keep speed in bounds
        const speed = Math.sqrt(bubble.vx * bubble.vx + bubble.vy * bubble.vy);
        const maxSpeed = 1.5;
        const minSpeed = 0.3;
        if (speed > maxSpeed) {
          bubble.vx = (bubble.vx / speed) * maxSpeed;
          bubble.vy = (bubble.vy / speed) * maxSpeed;
        } else if (speed < minSpeed) {
          bubble.vx = (bubble.vx / speed) * minSpeed;
          bubble.vy = (bubble.vy / speed) * minSpeed;
        }
      });

      setPositions(bubbles.map(b => ({ x: b.x, y: b.y })));
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
      <div ref={containerRef} className="relative h-36 overflow-hidden">
        {skills.map((skill, index) => (
          <span
            key={skill.label}
            className={cn(
              "bubble-tag absolute px-2 py-1 rounded-full shadow-sm text-[10px] font-medium whitespace-nowrap",
              skill.color
            )}
            style={{ 
              transform: `translate(${positions[index]?.x || 0}px, ${positions[index]?.y || 0}px)`,
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
