import { Briefcase } from "lucide-react";

const experiences = [
  {
    title: "Product Manager",
    company: "AdvantageClub.ai",
    period: "Current",
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
    description: "Engineered automated data pipelines saving psychologists 2-3 hours/week. Developed 'MindFit' screening tools.",
  },
  {
    title: "Executive Board Member",
    company: "Fine Arts Society",
    period: "Oct 2023 - May 2025",
    description: "Directed visual vision for KaleidoScope (5000+ attendees).",
  },
];

const ExperienceCard = () => {
  return (
    <div className="bento-card animate-fade-up" style={{ animationDelay: "200ms" }}>
      <div className="flex items-center gap-2 mb-4">
        <Briefcase className="w-4 h-4 text-foreground" />
        <h2 className="text-sm font-semibold text-foreground">Experience</h2>
      </div>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[5px] top-2 bottom-2 w-[2px] bg-border" />
        
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-5">
              {/* Timeline dot */}
              <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-primary border-2 border-card" />
              
              <div className="space-y-0.5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <h3 className="font-medium text-sm text-foreground">{exp.title}</h3>
                  <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full w-fit">
                    {exp.period}
                  </span>
                </div>
                <p className="text-xs font-medium text-muted-foreground">{exp.company}</p>
                <p className="text-xs text-muted-foreground">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
