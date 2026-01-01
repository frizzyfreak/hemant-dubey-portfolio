import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";

const HeaderCard = () => {
  return (
    <div className="bento-card col-span-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3" style={{ animationDelay: "0ms" }}>
      <div className="space-y-0.5">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          Hemant Dubey
        </h1>
        <p className="text-muted-foreground text-xs uppercase tracking-wider">
          Product Management. Designing. GenAI Enthusiast.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Button 
          asChild
          className="rounded-full px-4 py-1.5 text-xs bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:scale-105"
        >
          <a href="mailto:hdubey_be22@thapar.edu">
            <Mail className="w-3 h-3 mr-1.5" />
            Contact Me
          </a>
        </Button>
      </div>
    </div>
  );
};

export default HeaderCard;
