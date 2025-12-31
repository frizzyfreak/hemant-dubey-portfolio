import { cn } from "@/lib/utils";

interface Project {
  title: string;
  description: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: "YouNotes",
    description: "AI Study Guide + Quiz Generator using just YouTube links. Built with LangGraph & YouTube Transcript API.",
    featured: true,
  },
  {
    title: "Speech Intent Recognizer",
    description: "End-to-end voice command classification achieving 98.84% accuracy using fine-tuned Wav2Vec2.",
  },
  {
    title: "Movie Recommender",
    description: "Hybrid recommendation model using Matrix Factorization and KNN. RMSE 0.76 with 87% genre accuracy.",
  },
];

const ProjectsSection = () => {
  return (
    <div className="bento-card animate-fade-up" style={{ animationDelay: "800ms" }}>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-1.5 h-1.5 rounded-full bg-pastel-mint" />
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Projects</h2>
      </div>
      <div className="border-t border-border mb-2" />
      
      <div className="space-y-2 max-h-56 overflow-y-auto pr-2 scrollbar-thin">
        {projects.map((project, index) => (
          <div
            key={project.title}
            className={cn(
              "group p-3 rounded-lg border border-border cursor-pointer transition-all duration-300",
              "hover:bg-primary hover:border-primary"
            )}
          >
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 group-hover:bg-primary-foreground transition-colors">
                <span className="text-foreground font-bold text-xs group-hover:text-primary transition-colors">
                  {project.title.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-xs text-foreground group-hover:text-primary-foreground transition-colors flex items-center gap-1.5">
                  {project.title}
                  {project.featured && (
                    <span className="text-[8px] bg-pastel-orange text-foreground px-1 py-0.5 rounded group-hover:bg-primary-foreground group-hover:text-primary transition-colors">
                      Featured
                    </span>
                  )}
                </h3>
                <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-2 group-hover:text-primary-foreground/80 transition-colors">
                  {project.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
