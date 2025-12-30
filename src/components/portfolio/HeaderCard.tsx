import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeaderCard = () => {
  return (
    <div className="bento-card col-span-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ animationDelay: "0ms" }}>
      <div className="space-y-1">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Hemant Dubey
        </h1>
        <p className="text-muted-foreground text-lg">
          Electronics & Computer Engineering | ML Enthusiast
        </p>
      </div>
      <Button 
        asChild
        className="rounded-full px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:scale-105"
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
