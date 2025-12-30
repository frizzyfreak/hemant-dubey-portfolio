import { cn } from "@/lib/utils";

const skills = [
  { label: "Machine Learning", color: "bg-pastel-lavender text-foreground" },
  { label: "Data Pipelines", color: "bg-pastel-blue text-foreground" },
  { label: "SaaS Development", color: "bg-pastel-mint text-foreground" },
  { label: "Predictive Modeling", color: "bg-pastel-orange text-foreground" },
  { label: "Product Management", color: "bg-pastel-pink text-foreground" },
  { label: "Building Agentic Models", color: "bg-pastel-yellow text-foreground" },
];

const WhatIDoCard = () => {
  return (
    <div className="bento-card animate-fade-up" style={{ animationDelay: "600ms" }}>
      <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">What I Do</h2>
      <div className="border-t border-border mb-4" />
      <div className="relative h-44 overflow-hidden">
        {skills.map((skill, index) => (
          <span
            key={skill.label}
            className={cn(
              "skill-tag absolute animate-float shadow-sm text-xs",
              skill.color
            )}
            style={{ 
              animationDelay: `${index * 400}ms`,
              top: `${[8, 35, 62, 75, 48, 20][index]}%`,
              left: `${[55, 5, 45, 2, 50, 15][index]}%`,
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
