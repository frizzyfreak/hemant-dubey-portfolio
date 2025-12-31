const skills = [
  "Python", "SQL", "C++", "HTML", "CSS", "TensorFlow", "PyTorch", "NLP", 
  "GenAI", "Conversational AI", "Speech Recognition", "Product Lifecycle", 
  "Defining KPIs", "A/B Testing", "PowerBI", "Excel", "Scrum", "Agile", 
  "Docker", "Figma", "MySQL", "GCP", "Machine Learning", "Data Pipelines"
];

const TechnicalSkillsCard = () => {
  return (
    <div className="bento-card-static col-span-full animate-fade-up" style={{ animationDelay: "1100ms" }}>
      <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Skills</h2>
      <div className="border-t border-border mb-3" />
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 text-xs font-medium border border-border rounded-full 
                       text-foreground bg-transparent cursor-pointer
                       transition-all duration-300 ease-out
                       hover:bg-primary hover:text-primary-foreground hover:border-primary
                       hover:scale-105"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TechnicalSkillsCard;
