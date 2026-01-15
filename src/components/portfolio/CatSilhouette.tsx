import { useEffect, useState } from "react";

interface CatSilhouetteProps {
  position: "top-left" | "top-right";
}

const CatSilhouette = ({ position }: CatSilhouetteProps) => {
  const [isCleaning, setIsCleaning] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [showDust, setShowDust] = useState(false);
  const [currentSide, setCurrentSide] = useState<"left" | "right">(
    position === "top-left" ? "left" : "right"
  );
  const [runProgress, setRunProgress] = useState(0); // 0 to 100
  const [runningDirection, setRunningDirection] = useState<"left" | "right">("right");

  useEffect(() => {
    const cleanInterval = setInterval(() => {
      if (!isRunning) {
        setIsCleaning(true);
        setTimeout(() => setIsCleaning(false), 2000);
      }
    }, 5000);

    return () => clearInterval(cleanInterval);
  }, [isRunning]);

  const handleHover = () => {
    if (isRunning) return;
    setIsCleaning(false);
    setIsRunning(true);
    setShowDust(true);
    
    const targetSide = currentSide === "left" ? "right" : "left";
    setRunningDirection(targetSide); // Cat runs TOWARD the target side
    
    const startTime = Date.now();
    const duration = 800; // ms
    
    // Hide dust after initial burst
    setTimeout(() => setShowDust(false), 400);
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic for natural deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setRunProgress(eased * 100);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentSide(targetSide);
        setRunProgress(0);
        setIsRunning(false);
      }
    };
    
    requestAnimationFrame(animate);
  };

  const isLeft = currentSide === "left";
  
  // Calculate position based on run progress
  const getPositionStyle = () => {
    if (!isRunning) {
      return {
        left: isLeft ? '-4px' : 'auto',
        right: isLeft ? 'auto' : '-4px',
      };
    }
    
    if (currentSide === "left") {
      // Running from left to right
      return {
        left: `calc(-4px + ${runProgress}% - ${runProgress * 0.32}px)`,
        right: 'auto',
      };
    } else {
      // Running from right to left
      return {
        left: 'auto',
        right: `calc(-4px + ${runProgress}% - ${runProgress * 0.32}px)`,
      };
    }
  };

  // Cat faces the direction it's running/sitting
  const getTransform = () => {
    if (isRunning) {
      // Face the direction we're running TO
      return runningDirection === "right" ? 'scaleX(-1)' : 'scaleX(1)';
    }
    // When sitting, face inward toward the card center
    return isLeft ? 'scaleX(-1)' : 'scaleX(1)';
  };

  return (
    <div 
      className="absolute -top-2 z-10"
      style={{ 
        transform: getTransform(),
        ...getPositionStyle(),
      }}
      onMouseEnter={handleHover}
    >
      {/* Dust cloud effect */}
      {showDust && (
        <div 
          className="absolute top-2"
          style={{
            // Dust appears behind the cat (opposite of running direction)
            left: runningDirection === "right" ? '-20px' : 'auto',
            right: runningDirection === "left" ? '-20px' : 'auto',
          }}
        >
          <svg viewBox="0 0 40 30" className="w-6 h-4 fill-muted-foreground/40">
            <circle cx="8" cy="20" r="6" style={{ animation: "dustPuff 0.4s ease-out forwards" }} />
            <circle cx="18" cy="15" r="5" style={{ animation: "dustPuff 0.4s ease-out 0.05s forwards" }} />
            <circle cx="28" cy="18" r="4" style={{ animation: "dustPuff 0.4s ease-out 0.1s forwards" }} />
            <circle cx="12" cy="10" r="3" style={{ animation: "dustPuff 0.4s ease-out 0.08s forwards" }} />
            <circle cx="24" cy="8" r="3" style={{ animation: "dustPuff 0.4s ease-out 0.12s forwards" }} />
          </svg>
        </div>
      )}
      
      <svg 
        viewBox="0 0 100 80" 
        className="w-8 h-6 fill-foreground cursor-pointer"
        style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.1))' }}
      >
        {isRunning ? (
          // Running cat pose - head in front (toward running direction)
          <>
            {/* Tail - streaming behind */}
            <path d="M20,45 Q5,35 0,50" />
            
            {/* Stretched body */}
            <ellipse cx="50" cy="50" rx="30" ry="15" />
            
            {/* Head - in front (right side since cat faces right) */}
            <circle cx="80" cy="40" r="15" />
            
            {/* Ears */}
            <polygon points="78,28 88,12 92,28" />
            <polygon points="88,25 95,10 98,25" />
            
            {/* Running legs animation */}
            <ellipse cx="25" cy="62" rx="5" ry="8" 
              style={{ animation: "legRun 0.1s ease-in-out infinite alternate" }} />
            <ellipse cx="40" cy="62" rx="5" ry="8" 
              style={{ animation: "legRun 0.1s ease-in-out infinite alternate-reverse" }} />
            <ellipse cx="60" cy="62" rx="5" ry="8" 
              style={{ animation: "legRun 0.1s ease-in-out infinite alternate" }} />
            <ellipse cx="75" cy="62" rx="5" ry="8" 
              style={{ animation: "legRun 0.1s ease-in-out infinite alternate-reverse" }} />
          </>
        ) : (
          // Sitting cat pose
          <>
            {/* Tail with animation */}
            <path 
              d="M25,50 Q10,35 5,45 Q0,55 10,55"
              className="origin-left"
              style={{
                animation: "tailWag 0.8s ease-in-out infinite alternate",
                transformOrigin: "25px 50px"
              }}
            />
            
            {/* Cat body - sitting pose */}
            <ellipse cx="50" cy="55" rx="25" ry="20" />
            
            {/* Head - facing right (toward card center) */}
            <circle cx="70" cy="35" r="18" />
            
            {/* Right ear */}
            <polygon points="70,20 80,5 85,20" />
            
            {/* Left ear */}
            <polygon points="55,25 65,0 70,15" />
            
            {/* Front paws */}
            <ellipse cx="45" cy="70" rx="8" ry="5" />
            <ellipse cx="65" cy="70" rx="8" ry="5" />
            
            {/* Cleaning paw - shows when cleaning */}
            {isCleaning && (
              <ellipse 
                cx="82" 
                cy="38" 
                rx="6" 
                ry="10"
                style={{
                  animation: "pawClean 0.5s ease-in-out infinite",
                  transformOrigin: "82px 48px"
                }}
              />
            )}
          </>
        )}
      </svg>
      
      <style>{`
        @keyframes tailWag {
          from { transform: rotate(-15deg); }
          to { transform: rotate(15deg); }
        }
        @keyframes pawClean {
          0%, 100% { transform: rotate(20deg) translateY(0); }
          50% { transform: rotate(20deg) translateY(-5px); }
        }
        @keyframes legRun {
          0% { transform: translateY(-3px) rotate(-10deg); }
          100% { transform: translateY(3px) rotate(10deg); }
        }
        @keyframes dustPuff {
          0% { opacity: 0.6; transform: scale(0.5) translateY(0); }
          100% { opacity: 0; transform: scale(1.5) translateY(-8px); }
        }
      `}</style>
    </div>
  );
};

export default CatSilhouette;
