import { ArrowUpRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  featured?: boolean;
  delay?: number;
}

const ProjectCard = ({ title, description, featured = false, delay = 0 }: ProjectCardProps) => {
  return (
    <div 
      className={cn(
        "bento-card group cursor-pointer animate-fade-up",
        featured && "ring-2 ring-primary/20 bg-gradient-to-br from-card to-pastel-lavender/20"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {featured && (
            <div className="p-1 rounded bg-pastel-orange">
              <Star className="w-3 h-3 text-foreground fill-current" />
            </div>
          )}
          <h3 className={cn(
            "font-semibold text-foreground",
            featured && "text-lg"
          )}>
            {title}
          </h3>
        </div>
        <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      {featured && (
        <div className="mt-3 inline-flex items-center text-xs font-medium text-foreground bg-pastel-mint px-2 py-1 rounded-full">
          Featured Project
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
