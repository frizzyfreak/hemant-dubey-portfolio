import { GraduationCap } from "lucide-react";

const EducationCard = () => {
  return (
    <div className="bento-card animate-fade-up relative" style={{ animationDelay: "300ms" }}>
      <div className="flex items-center gap-2 mb-2">
        <GraduationCap className="w-3 h-3 text-foreground" />
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Education</h2>
      </div>
      <div className="border-t border-border mb-2" />
      <div className="space-y-0.5">
        <h3 className="font-medium text-xs text-foreground">B.Tech in Electronics & Computer Engineering</h3>
        <p className="text-[10px] text-muted-foreground">Thapar Institute of Engineering and Technology</p>
      </div>
    </div>
  );
};

export default EducationCard;
