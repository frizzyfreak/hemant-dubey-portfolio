import { Award, Trophy } from "lucide-react";

const achievements = [
  {
    icon: Trophy,
    title: "Amazon ML Summer School",
    description: "Selected 2x (1 of 80,000+ applicants)",
  },
  {
    icon: Award,
    title: "IEEE Research Paper",
    description: "Co-authored paper on Credit Card Fraud Detection",
  },
];

const AchievementsCard = () => {
  return (
    <div className="bento-card animate-fade-up" style={{ animationDelay: "700ms" }}>
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-5 h-5 text-foreground" />
        <h2 className="text-xl font-semibold text-foreground">Achievements</h2>
      </div>
      <div className="space-y-4">
        {achievements.map((achievement, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-pastel-lavender">
              <achievement.icon className="w-4 h-4 text-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{achievement.title}</h3>
              <p className="text-sm text-muted-foreground">{achievement.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsCard;
