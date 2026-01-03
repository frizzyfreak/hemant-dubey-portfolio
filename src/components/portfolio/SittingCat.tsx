import { useState, useEffect } from "react";

const SittingCat = () => {
  const [isCleaningFace, setIsCleaningFace] = useState(false);

  useEffect(() => {
    const cleanInterval = setInterval(() => {
      setIsCleaningFace(true);
      setTimeout(() => setIsCleaningFace(false), 2000);
    }, 5000);

    return () => clearInterval(cleanInterval);
  }, []);

  return (
    <div className="absolute -top-3 -left-3 z-10">
      <div className="relative">
        {/* Cat body */}
        <div className="relative w-7 h-5 bg-foreground/80 rounded-[50%_50%_50%_50%/60%_60%_40%_40%]">
          {/* Ears */}
          <div className="absolute -top-2 left-0.5 w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[5px] border-b-foreground/80" />
          <div className="absolute -top-2 right-0.5 w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[5px] border-b-foreground/80" />
          
          {/* Inner ears */}
          <div className="absolute -top-1 left-1 w-0 h-0 border-l-[2px] border-l-transparent border-r-[2px] border-r-transparent border-b-[3px] border-b-primary/40" />
          <div className="absolute -top-1 right-1 w-0 h-0 border-l-[2px] border-l-transparent border-r-[2px] border-r-transparent border-b-[3px] border-b-primary/40" />
          
          {/* Eyes */}
          <div className="absolute top-1.5 left-1 w-1.5 h-1.5 bg-primary rounded-full">
            <div className="absolute top-0 left-0.5 w-0.5 h-0.5 bg-background rounded-full" />
          </div>
          <div className="absolute top-1.5 right-1 w-1.5 h-1.5 bg-primary rounded-full">
            <div className="absolute top-0 left-0.5 w-0.5 h-0.5 bg-background rounded-full" />
          </div>
          
          {/* Nose */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-1 h-0.5 bg-primary/50 rounded-full" />
          
          {/* Whiskers */}
          <div className="absolute top-3 left-0 w-2 h-[1px] bg-foreground/40 -rotate-12" />
          <div className="absolute top-3.5 left-0 w-2 h-[1px] bg-foreground/40 rotate-12" />
          <div className="absolute top-3 right-0 w-2 h-[1px] bg-foreground/40 rotate-12" />
          <div className="absolute top-3.5 right-0 w-2 h-[1px] bg-foreground/40 -rotate-12" />
        </div>
        
        {/* Paw for cleaning - only shows when cleaning */}
        {isCleaningFace && (
          <div 
            className="absolute top-1 -right-1 w-2 h-3 bg-foreground/80 rounded-full origin-bottom"
            style={{
              animation: "pawClean 0.5s ease-in-out infinite",
            }}
          />
        )}
        
        {/* Tail */}
        <div 
          className="absolute -right-4 top-2 w-5 h-1.5 bg-foreground/80 rounded-full origin-left"
          style={{
            animation: "tailWag 0.8s ease-in-out infinite alternate",
          }}
        />
        
        {/* Front legs (sitting) */}
        <div className="absolute bottom-0 left-0.5 w-1.5 h-1.5 bg-foreground/80 rounded-full" />
        <div className="absolute bottom-0 right-0.5 w-1.5 h-1.5 bg-foreground/80 rounded-full" />
      </div>
      
      <style>{`
        @keyframes tailWag {
          from { transform: rotate(-20deg); }
          to { transform: rotate(20deg); }
        }
        @keyframes pawClean {
          0%, 100% { transform: rotate(-30deg) translateY(0); }
          50% { transform: rotate(-30deg) translateY(-3px); }
        }
      `}</style>
    </div>
  );
};

export default SittingCat;
