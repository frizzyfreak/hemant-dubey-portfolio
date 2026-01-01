const skills = [
  "Python", "SQL", "C++", "HTML", "CSS", "JavaScript", "TensorFlow", "PyTorch", 
  "NLP", "GenAI", "Keras", "NumPy", "pandas", "scikit-learn", "Conversational AI", 
  "Speech Recognition", "Predictive Modeling", "PCA", "Product Lifecycle", 
  "Defining KPIs", "A/B Testing", "PowerBI", "Excel", "Scrum", "Agile", 
  "Docker", "Figma", "MySQL", "GCP", "Machine Learning", "Data Pipelines",
  "Apache Spark", "Databricks", "Streamlit", "MATLAB", "Linux", "GitHub"
];

const TechnicalSkillsCard = () => {
  return (
    <div className="bento-card-static animate-fade-up h-full" style={{ animationDelay: "650ms" }}>
      <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Skills</h2>
      <div className="border-t border-border mb-3" />
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-2 py-1 text-[10px] font-medium border border-border rounded-full 
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
