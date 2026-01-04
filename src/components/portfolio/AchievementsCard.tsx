import { Award, Trophy, Briefcase } from "lucide-react";

const achievements = [
  {
    icon: Trophy,
    title: "Amazon ML Summer School",
    description: "Selected twice (1 of 80,000+ applicants)",
    highlighted: false,
  },
  {
    icon: Briefcase,
    title: "ML Trainee Internship at DRDO",
    description: "Built 'MindFit' automated screening tools at SSPL Lab",
    highlighted: false,
  },
  {
    icon: Award,
    title: "IEEE Research Paper",
    description: "Co-authored paper on Credit Card Fraud Detection",
    highlighted: false,
  },
];

const AchievementsCard = () => {
  return (
    <div className="bento-card animate-fade-up" style={{ animationDelay: "700ms" }}>
      <div className="flex items-center gap-2 mb-2">
        <Award className="w-3 h-3 text-foreground" />
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Achievements</h2>
      </div>
      <div className="border-t border-border mb-2" />
      <div className="space-y-2">
        {achievements.map((achievement, index) => (
          <div 
            key={index} 
            className="flex items-start gap-2 p-1.5 rounded-lg transition-all duration-200"
          >
            <div className="p-1 rounded-lg bg-pastel-lavender">
              <achievement.icon className="w-2.5 h-2.5 text-foreground" />
            </div>
            <div>
              <h3 className="font-medium text-xs text-foreground">
                {achievement.title}
              </h3>
              <p className="text-[10px] text-muted-foreground">{achievement.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsCard;
