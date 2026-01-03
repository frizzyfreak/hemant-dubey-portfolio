import { useState, useEffect } from "react";

interface SittingCatProps {
  position?: "left" | "right";
}

const SittingCat = ({ position = "left" }: SittingCatProps) => {
  const [isCleaningFace, setIsCleaningFace] = useState(false);

  useEffect(() => {
    const cleanInterval = setInterval(() => {
      setIsCleaningFace(true);
      setTimeout(() => setIsCleaningFace(false), 2000);
    }, 5000);

    return () => clearInterval(cleanInterval);
  }, []);

  const isLeft = position === "left";
  const positionClasses = isLeft ? "-top-2 -left-2" : "-top-2 -right-2";

  return (
    <div className={`absolute ${positionClasses} z-10`}>
      <div className={`relative ${!isLeft ? "scale-x-[-1]" : ""}`}>
        {/* Cat silhouette - sitting pose */}
        <svg 
          width="24" 
          height="20" 
          viewBox="0 0 24 20" 
          className="fill-foreground/80"
        >
          {/* Ears */}
          <polygon points="4,6 6,0 8,6" />
          <polygon points="16,6 18,0 20,6" />
          
          {/* Head */}
          <ellipse cx="12" cy="8" rx="8" ry="6" />
          
          {/* Eyes */}
          <circle cx="9" cy="7" r="1.5" className="fill-primary" />
          <circle cx="15" cy="7" r="1.5" className="fill-primary" />
          <circle cx="9.3" cy="6.5" r="0.5" className="fill-background" />
          <circle cx="15.3" cy="6.5" r="0.5" className="fill-background" />
          
          {/* Nose */}
          <ellipse cx="12" cy="10" rx="1" ry="0.5" className="fill-primary/50" />
          
          {/* Body sitting */}
          <ellipse cx="12" cy="17" rx="6" ry="4" />
          
          {/* Front paws */}
          <ellipse cx="8" cy="19" rx="2" ry="1.5" />
          <ellipse cx="16" cy="19" rx="2" ry="1.5" />
        </svg>
        
        {/* Paw for cleaning */}
        {isCleaningFace && (
          <div 
            className="absolute top-2 right-0 w-2 h-3 bg-foreground/80 rounded-full origin-bottom"
            style={{
              animation: "pawClean 0.5s ease-in-out infinite",
            }}
          />
        )}
        
        {/* Tail */}
        <div 
          className="absolute -right-4 top-3 w-5 h-1.5 bg-foreground/80 rounded-full origin-left"
          style={{
            animation: "tailWag 0.8s ease-in-out infinite alternate",
          }}
        />
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
