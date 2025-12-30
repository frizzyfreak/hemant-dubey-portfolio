import { cn } from "@/lib/utils";

const skillCategories = [
  {
    category: "Languages",
    skills: ["Python", "SQL", "C++", "HTML", "CSS"],
    color: "bg-pastel-blue",
  },
  {
    category: "AI/ML",
    skills: ["TensorFlow", "PyTorch", "NLP", "GenAI", "Conversational AI", "Speech Recognition"],
    color: "bg-pastel-lavender",
  },
  {
    category: "Product & Analytics",
    skills: ["Product Lifecycle", "Defining KPIs", "A/B Testing", "PowerBI", "Excel"],
    color: "bg-pastel-orange",
  },
  {
    category: "Methodologies",
    skills: ["Scrum", "Agile"],
    color: "bg-pastel-mint",
  },
  {
    category: "Tools",
    skills: ["Docker", "Figma", "MySQL", "GCP"],
    color: "bg-pastel-pink",
  },
];

const TechnicalSkillsCard = () => {
  return (
    <div className="bento-card col-span-full animate-fade-up" style={{ animationDelay: "1100ms" }}>
      <h2 className="text-sm font-semibold mb-4 text-foreground">Technical Skills</h2>
      <div className="space-y-3">
        {skillCategories.map((category, categoryIndex) => (
          <div key={category.category}>
            <h3 className="text-xs font-medium text-muted-foreground mb-1.5">{category.category}</h3>
            <div className="flex flex-wrap gap-1.5">
              {category.skills.map((skill, skillIndex) => (
                <span
                  key={skill}
                  className={cn(
                    "skill-tag text-foreground",
                    category.color
                  )}
                  style={{ animationDelay: `${(categoryIndex * 100) + (skillIndex * 50)}ms` }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnicalSkillsCard;
