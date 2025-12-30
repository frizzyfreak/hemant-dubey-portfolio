import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeaderCard = () => {
  return (
    <div className="bento-card col-span-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ animationDelay: "0ms" }}>
      <div className="space-y-0.5">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Hemant Dubey
        </h1>
        <p className="text-muted-foreground text-sm uppercase tracking-wider">
          Product Management. Designing. GenAI Enthusiast.
        </p>
      </div>
      <Button 
        asChild
        className="rounded-full px-5 py-2 text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:scale-105"
      >
        <a href="mailto:hdubey_be22@thapar.edu">
          <Mail className="w-4 h-4 mr-2" />
          Contact Me
        </a>
      </Button>
    </div>
  );
};

export default HeaderCard;
