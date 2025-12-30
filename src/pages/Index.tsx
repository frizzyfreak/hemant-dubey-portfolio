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
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto px-4 py-8 sm:py-12">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {/* Header - Full Width */}
          <HeaderCard />

          {/* Left Column */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-5">
            <AboutCard />
            <ExperienceCard />
          </div>

          {/* Center Column */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-5">
            <ClockWidget />
            <ContactCard />
            <WhatIDoCard />
            <AchievementsCard />
          </div>

          {/* Right Column - Projects */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-5">
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
