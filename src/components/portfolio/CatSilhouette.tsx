import { useEffect, useState } from "react";

interface CatSilhouetteProps {
  position: "top-left" | "top-right";
}

const CatSilhouette = ({ position }: CatSilhouetteProps) => {
  const [isCleaning, setIsCleaning] = useState(false);

  useEffect(() => {
    const cleanInterval = setInterval(() => {
      setIsCleaning(true);
      setTimeout(() => setIsCleaning(false), 2000);
    }, 5000);

    return () => clearInterval(cleanInterval);
  }, []);

  const isLeft = position === "top-left";

  return (
    <div 
      className={`absolute -top-2 ${isLeft ? '-left-1' : '-right-1'} z-10`}
      style={{ transform: isLeft ? 'scaleX(1)' : 'scaleX(-1)' }}
    >
      <svg 
        viewBox="0 0 100 80" 
        className="w-8 h-6 fill-foreground"
        style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.1))' }}
      >
        {/* Cat body - sitting pose */}
        <ellipse cx="50" cy="55" rx="25" ry="20" />
        
        {/* Head */}
        <circle cx="30" cy="35" r="18" />
        
        {/* Left ear */}
        <polygon points="15,25 20,5 30,20" />
        
        {/* Right ear */}
        <polygon points="35,15 45,0 45,20" />
        
        {/* Tail with animation */}
        <path 
          d="M75,50 Q90,35 95,45 Q100,55 90,55"
          className="origin-left"
          style={{
            animation: "tailWag 0.8s ease-in-out infinite alternate",
            transformOrigin: "75px 50px"
          }}
        />
        
        {/* Front paws */}
        <ellipse cx="35" cy="70" rx="8" ry="5" />
        <ellipse cx="55" cy="70" rx="8" ry="5" />
        
        {/* Cleaning paw - shows when cleaning */}
        {isCleaning && (
          <ellipse 
            cx="18" 
            cy="38" 
            rx="6" 
            ry="10"
            style={{
              animation: "pawClean 0.5s ease-in-out infinite",
              transformOrigin: "18px 48px"
            }}
          />
        )}
      </svg>
      
      <style>{`
        @keyframes tailWag {
          from { transform: rotate(-15deg); }
          to { transform: rotate(15deg); }
        }
        @keyframes pawClean {
          0%, 100% { transform: rotate(-20deg) translateY(0); }
          50% { transform: rotate(-20deg) translateY(-5px); }
        }
      `}</style>
    </div>
  );
};

export default CatSilhouette;
