import HeaderCard from "@/components/portfolio/HeaderCard";
import AboutCard from "@/components/portfolio/AboutCard";
import ExperienceCard from "@/components/portfolio/ExperienceCard";
import EducationCard from "@/components/portfolio/EducationCard";
import ClockWidget from "@/components/portfolio/ClockWidget";
import ContactCard from "@/components/portfolio/ContactCard";
import WhatIDoCard from "@/components/portfolio/WhatIDoCard";
import AchievementsCard from "@/components/portfolio/AchievementsCard";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import TechnicalSkillsCard from "@/components/portfolio/TechnicalSkillsCard";
import GitHubContributions from "@/components/portfolio/GitHubContributions";
import Footer from "@/components/portfolio/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 animate-gradient-shift">
      <div className="container max-w-6xl mx-auto px-4 py-6 sm:py-10">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
          {/* Header - Full Width */}
          <HeaderCard />

          {/* Left Column */}
          <div className="lg:col-span-1 space-y-2 sm:space-y-3">
            <AboutCard />
            <ExperienceCard />
          </div>

          {/* Center Column */}
          <div className="lg:col-span-1 space-y-2 sm:space-y-3">
            <ClockWidget />
            <ContactCard />
            <WhatIDoCard />
          </div>

          {/* Right Column - Projects */}
          <div className="lg:col-span-1 space-y-2 sm:space-y-3">
            <EducationCard />
            <ProjectsSection />
            <AchievementsCard />
          </div>

          {/* Skills - Single Column */}
          <TechnicalSkillsCard />

          {/* GitHub Contributions - Full 2 Column Width */}
          <div className="lg:col-span-2">
            <GitHubContributions />
          </div>

          {/* Footer - Full Width */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Index;
