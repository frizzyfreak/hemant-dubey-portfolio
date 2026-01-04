import { Briefcase } from "lucide-react";

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  points: string[];
}

const experiences: ExperienceItem[] = [
  {
    title: "Product Manager Intern",
    company: "AdvantageClub.ai",
    period: "Jan 2026 - June 2026",
    points: [
      "Spearheaded end-to-end product implementation for 10+ enterprise clients, streamlining Rewards & Recognition (RNR) system.",
      "Defined business logic, configured platform workflows, integrated user data via APIs, and conducted rigorous UAT before deployment.",
    ],
  },
  {
    title: "Software Management Engineer",
    company: "TechEagles",
    period: "Sept 2025 - Present",
    points: [
      "Founding team member providing SaaS solutions to freelancing community.",
      "Secured role based on outstanding internship performance at DRDO.",
    ],
  },
  {
    title: "ML Project Trainee",
    company: "Solid State Physics Laboratory, DRDO",
    period: "June 2025 - July 2025",
    points: [
      "Engineered automated data pipeline using Google Apps Script to collect and augment 200+ psychological test responses, saving Psychologists 2-3 hours/week.",
      "Developed 'MindFit' Questionnaire leveraging PHQ-9 dataset to generate model-driven insights and interactive dashboard visualizations.",
      "Delivered project in fast-paced R&D setting; recognized as top 1% contributor on GitHub.",
    ],
  },
  {
    title: "Executive Board Member",
    company: "Fine Arts & Photography Society",
    period: "Oct 2023 - May 2025",
    points: [
      "Directed the creative vision for flagship Art & Music Festival KaleidoScope with 5,000+ attendees.",
      "Managed Core team on ideation, execution, and Art Exhibits in just about a month-long phase.",
      "Concluded tenure as Head of Sketching, leading a team of 30+ artists in the past year.",
    ],
  },
];

const ExperienceCard = () => {
  return (
    <div className="bento-card animate-fade-up relative" style={{ animationDelay: "200ms" }}>
      <div className="flex items-center gap-2 mb-3">
        <Briefcase className="w-3 h-3 text-foreground" />
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Experience</h2>
      </div>
      <div className="border-t border-border mb-3" />
      <div className="relative h-80 overflow-y-auto pr-2 scrollbar-thin">
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
                <ul className="text-[10px] text-muted-foreground leading-relaxed list-disc list-inside space-y-0.5 mt-1">
                  {exp.points.slice(0, 2).map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
