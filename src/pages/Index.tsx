import HeaderCard from "@/components/portfolio/HeaderCard";
import AboutCard from "@/components/portfolio/AboutCard";
import ExperienceCard from "@/components/portfolio/ExperienceCard";
import EducationCard from "@/components/portfolio/EducationCard";
import ClockWidget from "@/components/portfolio/ClockWidget";
import ContactCard from "@/components/portfolio/ContactCard";
import WhatIDoCard from "@/components/portfolio/WhatIDoCard";
import AchievementsCard from "@/components/portfolio/AchievementsCard";
import ProjectCard from "@/components/portfolio/ProjectCard";
import TechnicalSkillsCard from "@/components/portfolio/TechnicalSkillsCard";
import Footer from "@/components/portfolio/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto px-4 py-8 sm:py-12">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Header - Full Width */}
          <HeaderCard />

          {/* Left Column */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            <AboutCard />
            <ExperienceCard />
          </div>

          {/* Center Column */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            <ClockWidget />
            <ContactCard />
            <WhatIDoCard />
            <AchievementsCard />
          </div>

          {/* Right Column - Projects */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            <EducationCard />
            <ProjectCard
              title="YouNotes"
              description="AI Study Guide + Quiz Generator using just YouTube links. Built with LangGraph & YouTube Transcript API. Converts videos into comprehensive quizzes and summaries."
              featured
              delay={800}
            />
            <ProjectCard
              title="Speech Intent Recognizer"
              description="End-to-end voice command classification achieving 98.84% accuracy using fine-tuned Wav2Vec2. Surpassed generic voice assistants in precision."
              delay={900}
            />
            <ProjectCard
              title="Movie Recommender"
              description="Hybrid recommendation model using Matrix Factorization and KNN. Achieved RMSE of 0.76 on 50k ratings with 87% genre prediction accuracy."
              delay={1000}
            />
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
