import { cn } from "@/lib/utils";

const skills = [
  { label: "Machine Learning", color: "bg-pastel-lavender text-foreground" },
  { label: "Building Agentic Models", color: "bg-pastel-blue text-foreground" },
  { label: "Data Pipelines", color: "bg-pastel-mint text-foreground" },
  { label: "Product Management", color: "bg-pastel-orange text-foreground" },
  { label: "Predictive Modeling", color: "bg-pastel-pink text-foreground" },
  { label: "SaaS Development", color: "bg-pastel-yellow text-foreground" },
];

const WhatIDoCard = () => {
  return (
    <div className="bento-card animate-fade-up" style={{ animationDelay: "600ms" }}>
      <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">What I Do</h2>
      <div className="border-t border-border mb-3" />
      <div className="relative h-36 overflow-hidden">
        {skills.map((skill, index) => (
          <span
            key={skill.label}
            className={cn(
              "skill-tag absolute animate-float shadow-sm text-[10px]",
              skill.color
            )}
            style={{ 
              animationDelay: `${index * 400}ms`,
              top: `${[5, 30, 55, 70, 42, 15][index]}%`,
              left: `${[50, 2, 40, 0, 45, 12][index]}%`,
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
