import { Mail, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import TypingAnimation from "./TypingAnimation";

const HeaderCard = () => {
  const handleDownloadResume = () => {
    // Create a link to download the resume
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "HemantDubey_Resume.pdf";
    link.click();
  };

  return (
    <div className="bento-card col-span-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3" style={{ animationDelay: "0ms" }}>
      <div className="space-y-0.5">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          Hemant Dubey
        </h1>
        <p className="text-muted-foreground text-xs uppercase tracking-wider">
          <TypingAnimation text="Product Management. Designing. GenAI Enthusiast." />
        </p>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <ThemeToggle />
        <Button 
          onClick={handleDownloadResume}
          variant="outline"
          className="rounded-full px-3 py-1.5 text-xs border-border hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-105"
        >
          <Download className="w-3 h-3 mr-1.5" />
          Resume
        </Button>
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
