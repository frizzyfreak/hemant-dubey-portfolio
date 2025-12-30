import { GraduationCap } from "lucide-react";

const EducationCard = () => {
  return (
    <div className="bento-card animate-fade-up" style={{ animationDelay: "300ms" }}>
      <div className="flex items-center gap-2 mb-4">
        <GraduationCap className="w-5 h-5 text-foreground" />
        <h2 className="text-xl font-semibold text-foreground">Education</h2>
      </div>
      <div className="space-y-1">
        <h3 className="font-semibold text-foreground">B.Tech in Electronics & Computer Engineering</h3>
        <p className="text-muted-foreground">Thapar Institute of Engineering and Technology</p>
      </div>
    </div>
  );
};

export default EducationCard;
