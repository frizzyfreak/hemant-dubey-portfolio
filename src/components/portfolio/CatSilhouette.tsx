import { useEffect, useState, useRef } from "react";

interface CatSilhouetteProps {
  position: "top-left" | "top-right";
}

interface PawPrint {
  id: number;
  x: number;
  isLeft: boolean;
}

const CatSilhouette = ({ position }: CatSilhouetteProps) => {
  const [isCleaning, setIsCleaning] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [showDust, setShowDust] = useState(false);
  const [currentSide, setCurrentSide] = useState<"left" | "right">(
    position === "top-left" ? "left" : "right"
  );
  const [runProgress, setRunProgress] = useState(0);
  const [runningDirection, setRunningDirection] = useState<"left" | "right">("right");
  const [pawPrints, setPawPrints] = useState<PawPrint[]>([]);
  const pawPrintIdRef = useRef(0);

  useEffect(() => {
    const cleanInterval = setInterval(() => {
      if (!isRunning && !isBouncing) {
        setIsCleaning(true);
        setTimeout(() => setIsCleaning(false), 2000);
      }
    }, 5000);

    return () => clearInterval(cleanInterval);
  }, [isRunning, isBouncing]);

  const handleHover = () => {
    if (isRunning) return;
    setIsCleaning(false);
    setIsRunning(true);
    setShowDust(true);
    setPawPrints([]);
    
    const targetSide = currentSide === "left" ? "right" : "left";
    setRunningDirection(targetSide);
    
    const startTime = Date.now();
    const duration = 800;
    let lastPawTime = 0;
    let isLeftPaw = true;
    
    setTimeout(() => setShowDust(false), 400);
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const eased = 1 - Math.pow(1 - progress, 3);
      setRunProgress(eased * 100);
      
      // Add paw prints every 100ms while running
      if (elapsed - lastPawTime > 100 && progress < 0.95) {
        lastPawTime = elapsed;
        const newPawPrint: PawPrint = {
          id: pawPrintIdRef.current++,
          x: eased * 100,
          isLeft: isLeftPaw,
        };
        isLeftPaw = !isLeftPaw;
        setPawPrints(prev => [...prev, newPawPrint]);
        
        // Remove paw print after fade
        setTimeout(() => {
          setPawPrints(prev => prev.filter(p => p.id !== newPawPrint.id));
        }, 600);
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentSide(targetSide);
        setRunProgress(0);
        setIsRunning(false);
        // Trigger bounce animation
        setIsBouncing(true);
        setTimeout(() => setIsBouncing(false), 400);
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
  // The SVG cat faces RIGHT by default (head on right side)
  // scaleX(-1) flips it to face LEFT
  const getTransform = () => {
    if (isRunning) {
      // Face the direction we're running TO
      // Running right = face right = no flip (scaleX(1))
      // Running left = face left = flip (scaleX(-1))
      return runningDirection === "right" ? 'scaleX(1)' : 'scaleX(-1)';
    }
    // When sitting, face inward toward the card center
    // If on left side, face right (toward center) = scaleX(1)
    // If on right side, face left (toward center) = scaleX(-1)
    return isLeft ? 'scaleX(1)' : 'scaleX(-1)';
  };

  return (
    <>
      {/* Paw prints trail */}
      {pawPrints.map((paw) => (
        <div
          key={paw.id}
          className="absolute -top-1 z-5 pointer-events-none"
          style={{
            left: currentSide === "left" 
              ? `calc(-4px + ${paw.x}% - ${paw.x * 0.32}px)` 
              : 'auto',
            right: currentSide === "right" 
              ? `calc(-4px + ${paw.x}% - ${paw.x * 0.32}px)` 
              : 'auto',
            animation: "pawFade 0.6s ease-out forwards",
          }}
        >
          <svg 
            viewBox="0 0 20 20" 
            className="w-2 h-2 fill-foreground/20"
            style={{ 
              transform: `translateY(${paw.isLeft ? -2 : 2}px) scaleX(${runningDirection === "right" ? 1 : -1})` 
            }}
          >
            {/* Main pad */}
            <ellipse cx="10" cy="14" rx="5" ry="4" />
            {/* Toe beans */}
            <circle cx="5" cy="8" r="2" />
            <circle cx="10" cy="6" r="2" />
            <circle cx="15" cy="8" r="2" />
          </svg>
        </div>
      ))}
      
      <div 
        className="absolute -top-2 z-10"
        style={{ 
          transform: getTransform(),
          animation: isBouncing ? "catBounce 0.4s ease-out" : undefined,
          ...getPositionStyle(),
        }}
        onMouseEnter={handleHover}
      >
      {/* Initial dust burst effect */}
      {showDust && (
        <div 
          className="absolute top-2"
          style={{
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
      
      {/* Continuous dust trail while running */}
      {isRunning && (
        <div 
          className="absolute top-3"
          style={{
            left: runningDirection === "right" ? '-12px' : 'auto',
            right: runningDirection === "left" ? '-12px' : 'auto',
          }}
        >
          <svg viewBox="0 0 30 20" className="w-5 h-3 fill-muted-foreground/30">
            <circle cx="6" cy="14" r="4" style={{ animation: "dustTrail 0.2s ease-out infinite" }} />
            <circle cx="14" cy="10" r="3" style={{ animation: "dustTrail 0.2s ease-out 0.05s infinite" }} />
            <circle cx="22" cy="12" r="2.5" style={{ animation: "dustTrail 0.2s ease-out 0.1s infinite" }} />
            <circle cx="10" cy="6" r="2" style={{ animation: "dustTrail 0.2s ease-out 0.08s infinite" }} />
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
        @keyframes dustTrail {
          0% { opacity: 0.4; transform: scale(1) translateX(0); }
          50% { opacity: 0.2; transform: scale(1.2) translateX(-4px); }
          100% { opacity: 0; transform: scale(0.8) translateX(-8px); }
        }
        @keyframes catBounce {
          0% { transform: ${getTransform()} translateY(0); }
          30% { transform: ${getTransform()} translateY(-6px); }
          50% { transform: ${getTransform()} translateY(0); }
          70% { transform: ${getTransform()} translateY(-3px); }
          100% { transform: ${getTransform()} translateY(0); }
        }
        @keyframes pawFade {
          0% { opacity: 0.4; }
          100% { opacity: 0; }
        }
      `}</style>
      </div>
    </>
  );
};

export default CatSilhouette;
