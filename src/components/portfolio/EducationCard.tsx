import { GraduationCap } from "lucide-react";

const EducationCard = () => {
  return (
    <div className="bento-card animate-fade-up" style={{ animationDelay: "300ms" }}>
      <div className="flex items-center gap-2 mb-3">
        <GraduationCap className="w-4 h-4 text-foreground" />
        <h2 className="text-sm font-semibold text-foreground">Education</h2>
      </div>
      <div className="space-y-0.5">
        <h3 className="font-medium text-sm text-foreground">B.Tech in Electronics & Computer Engineering</h3>
        <p className="text-xs text-muted-foreground">Thapar Institute of Engineering and Technology</p>
      </div>
    </div>
  );
};

export default EducationCard;
