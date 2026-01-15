import { useEffect, useState } from "react";

interface CatSilhouetteProps {
  position: "top-left" | "top-right";
}

const CatSilhouette = ({ position }: CatSilhouetteProps) => {
  const [isCleaning, setIsCleaning] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [currentSide, setCurrentSide] = useState<"left" | "right">(
    position === "top-left" ? "left" : "right"
  );
  const [runProgress, setRunProgress] = useState(0); // 0 to 100

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
    
    const targetSide = currentSide === "left" ? "right" : "left";
    const startTime = Date.now();
    const duration = 800; // ms
    
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
  // When running from left, progress goes 0->100 (left to right position)
  // When running from right, progress goes 0->100 (right to left position)
  const getPositionStyle = () => {
    if (!isRunning) {
      return {
        left: isLeft ? '-4px' : 'auto',
        right: isLeft ? 'auto' : '-4px',
      };
    }
    
    // During running, interpolate across the card
    // calc(start + progress * (end - start))
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

  // Flip direction: face right when running right, face left when running left
  const getTransform = () => {
    if (isRunning) {
      // When running from left, face right (scaleX(1))
      // When running from right, face left (scaleX(-1))
      return currentSide === "left" ? 'scaleX(1)' : 'scaleX(-1)';
    }
    // When sitting, face inward toward the card
    return isLeft ? 'scaleX(1)' : 'scaleX(-1)';
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
      <svg 
        viewBox="0 0 100 80" 
        className="w-8 h-6 fill-foreground cursor-pointer"
        style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.1))' }}
      >
        {isRunning ? (
          // Running cat pose
          <>
            {/* Stretched body */}
            <ellipse cx="50" cy="50" rx="30" ry="15" />
            
            {/* Head - slightly forward */}
            <circle cx="20" cy="40" r="15" />
            
            {/* Ears */}
            <polygon points="8,30 12,12 22,25" />
            <polygon points="22,22 30,8 32,25" />
            
            {/* Running legs animation */}
            <ellipse cx="25" cy="62" rx="5" ry="8" 
              style={{ animation: "legRun 0.1s ease-in-out infinite alternate" }} />
            <ellipse cx="40" cy="62" rx="5" ry="8" 
              style={{ animation: "legRun 0.1s ease-in-out infinite alternate-reverse" }} />
            <ellipse cx="60" cy="62" rx="5" ry="8" 
              style={{ animation: "legRun 0.1s ease-in-out infinite alternate" }} />
            <ellipse cx="75" cy="62" rx="5" ry="8" 
              style={{ animation: "legRun 0.1s ease-in-out infinite alternate-reverse" }} />
            
            {/* Tail - streaming behind */}
            <path d="M80,45 Q95,35 100,50" />
          </>
        ) : (
          // Sitting cat pose
          <>
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
          </>
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
        @keyframes legRun {
          0% { transform: translateY(-3px) rotate(-10deg); }
          100% { transform: translateY(3px) rotate(10deg); }
        }
      `}</style>
    </div>
  );
};

export default CatSilhouette;
