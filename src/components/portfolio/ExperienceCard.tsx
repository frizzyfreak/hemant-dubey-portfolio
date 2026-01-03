import { Briefcase } from "lucide-react";
import SittingCat from "./SittingCat";

const experiences = [
  {
    title: "Product Manager Intern",
    company: "AdvantageClub.ai",
    period: "Jan 2026 - June 2026",
    description: "Leading product initiatives and driving AI-powered solutions.",
  },
  {
    title: "Software Management Engineer",
    company: "TechEagles",
    period: "Sept 2025 - Present",
    description: "Founding team member providing SaaS solutions.",
  },
  {
    title: "ML Project Trainee",
    company: "Solid State Physics Laboratory, DRDO",
    period: "June 2025 - July 2025",
    description: "Engineered automated data pipelines saving psychologists 2-3 hours/week. Developed 'MindFit' screening tools for mental health assessment. Collaborated with defense research scientists on AI-driven behavioral analysis systems.",
  },
  {
    title: "Executive Board Member",
    company: "Fine Arts Society",
    period: "Oct 2023 - May 2025",
    description: "Directed visual vision for KaleidoScope (5000+ attendees). Led a team of 20+ designers and coordinated cross-functional creative initiatives. Managed event branding, promotional campaigns, and stakeholder communications.",
  },
];

const ExperienceCard = () => {
  return (
    <div className="bento-card animate-fade-up relative" style={{ animationDelay: "200ms" }}>
      <SittingCat position="left" />
      <SittingCat position="right" />
      <div className="flex items-center gap-2 mb-3">
        <Briefcase className="w-3 h-3 text-foreground" />
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Experience</h2>
      </div>
      <div className="border-t border-border mb-3" />
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[4px] top-1.5 bottom-1.5 w-[1.5px] bg-border" />
        
        <div className="space-y-3">
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-4">
              {/* Timeline dot */}
              <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-primary border-2 border-card" />
              
              <div className="space-y-0.5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5">
                  <h3 className="font-medium text-xs text-foreground">{exp.title}</h3>
                  <span className="text-[9px] text-foreground bg-muted px-1.5 py-0.5 rounded-full w-fit experience-period">
                    {exp.period}
                  </span>
                </div>
                <p className="text-[10px] font-medium text-muted-foreground">{exp.company}</p>
                <p className="text-[10px] text-muted-foreground leading-relaxed">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
