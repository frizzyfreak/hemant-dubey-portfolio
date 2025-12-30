import { cn } from "@/lib/utils";

const skills = [
  { label: "Machine Learning", color: "bg-pastel-lavender text-foreground" },
  { label: "Data Pipelines", color: "bg-pastel-blue text-foreground" },
  { label: "SaaS Development", color: "bg-pastel-mint text-foreground" },
  { label: "Predictive Modeling", color: "bg-pastel-orange text-foreground" },
  { label: "Product Management", color: "bg-pastel-pink text-foreground" },
  { label: "Creative Direction", color: "bg-pastel-yellow text-foreground" },
];

const WhatIDoCard = () => {
  return (
    <div className="bento-card animate-fade-up" style={{ animationDelay: "600ms" }}>
      <h2 className="text-xl font-semibold mb-4 text-foreground">What I Do</h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={skill.label}
            className={cn(
              "skill-tag animate-float",
              skill.color
            )}
            style={{ animationDelay: `${index * 200}ms` }}
          >
            {skill.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default WhatIDoCard;
