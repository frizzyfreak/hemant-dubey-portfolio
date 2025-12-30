const AboutCard = () => {
  return (
    <div className="bento-card animate-fade-up" style={{ animationDelay: "100ms" }}>
      <h2 className="text-sm font-semibold mb-3 text-foreground">About Me</h2>
      <p className="text-sm text-muted-foreground leading-relaxed">
        I'm not just code and logic; I build intelligent systems. From engineering automated data pipelines at DRDO to building end-to-end AI study tools like{" "}
        <span className="text-foreground font-medium">YouNotes</span>, I bridge the gap between raw data and actionable insights. Currently working as a{" "}
        <span className="text-foreground font-medium">Product Manager at AdvantageClub.ai</span> and freelancing as a Software Management Engineer at TechEagles.
      </p>
    </div>
  );
};

export default AboutCard;
