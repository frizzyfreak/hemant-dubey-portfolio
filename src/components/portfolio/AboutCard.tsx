import CatSilhouette from "./CatSilhouette";
import MagnifyText from "./MagnifyText";

const AboutCard = () => {
  return (
    <div className="bento-card animate-fade-up relative" style={{ animationDelay: "100ms" }}>
      <CatSilhouette position="top-left" />
      <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">About Me</h2>
      <div className="border-t border-border mb-2" />
      <p className="text-[11px] text-muted-foreground leading-relaxed">
        <MagnifyText text="I'm not just code and logic; I build intelligent systems. From engineering automated data pipelines at DRDO to building end-to-end AI study tools like" />{" "}
        <span className="text-foreground font-medium"><MagnifyText text="YouNotes" /></span>
        <MagnifyText text=", I bridge the gap between raw data and actionable insights. Currently working as a" />{" "}
        <span className="text-foreground font-medium"><MagnifyText text="Product Manager at AdvantageClub.ai" /></span>
        <MagnifyText text=" and freelancing as a Software Management Engineer at TechEagles." />
      </p>
    </div>
  );
};

export default AboutCard;
