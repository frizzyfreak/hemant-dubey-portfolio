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
import Footer from "@/components/portfolio/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 animate-gradient-shift">
      <div className="container max-w-6xl mx-auto px-4 py-6 sm:py-10">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {/* Header - Full Width */}
          <HeaderCard />

          {/* Left Column */}
          <div className="lg:col-span-1 space-y-3 sm:space-y-4">
            <AboutCard />
            <ExperienceCard />
          </div>

          {/* Center Column */}
          <div className="lg:col-span-1 space-y-3 sm:space-y-4">
            <ClockWidget />
            <ContactCard />
            <WhatIDoCard />
            <AchievementsCard />
          </div>

          {/* Right Column - Projects */}
          <div className="lg:col-span-1 space-y-3 sm:space-y-4">
            <EducationCard />
            <ProjectsSection />
          </div>

          {/* Full Width - Technical Skills */}
          <TechnicalSkillsCard />

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Index;
