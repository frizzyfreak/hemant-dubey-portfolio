const AboutCard = () => {
  return (
    <div className="bento-card animate-fade-up" style={{ animationDelay: "100ms" }}>
      <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">About Me</h2>
      <div className="border-t border-border mb-2" />
      <p className="text-[11px] text-muted-foreground leading-relaxed">
        I'm not just code and logic; I build intelligent systems. From engineering automated data pipelines at DRDO to building end-to-end AI study tools like{" "}
        <span className="text-foreground font-medium">YouNotes</span>, I bridge the gap between raw data and actionable insights. Currently working as a{" "}
        <span className="text-foreground font-medium">Product Manager at AdvantageClub.ai</span> and freelancing as a Software Management Engineer at TechEagles.
      </p>
    </div>
  );
};

export default AboutCard;
