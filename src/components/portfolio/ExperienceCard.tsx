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
      <div className="flex items-center gap-2 mb-6">
        <Briefcase className="w-5 h-5 text-foreground" />
        <h2 className="text-xl font-semibold text-foreground">Experience</h2>
      </div>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-border" />
        
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-6">
              {/* Timeline dot */}
              <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-primary border-4 border-card" />
              
              <div className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <h3 className="font-semibold text-foreground">{exp.title}</h3>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full w-fit">
                    {exp.period}
                  </span>
                </div>
                <p className="text-sm font-medium text-muted-foreground">{exp.company}</p>
                <p className="text-sm text-muted-foreground">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
