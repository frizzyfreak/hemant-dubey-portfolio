import { useEffect, useState, useRef } from "react";

type JourneyStep = 
  | 'hidden'
  | 'emerging'
  | 'at-clock'
  | 'walking-clock'
  | 'jumping-to-experience'
  | 'at-experience'
  | 'jumping-to-whatido'
  | 'at-whatido-left'
  | 'walking-whatido'
  | 'at-whatido-right'
  | 'sliding-to-github'
  | 'at-github'
  | 'waiting'
  | 'jumping-to-jet'
  | 'on-jet';

interface Position {
  x: number;
  y: number;
}

const JourneyCat = () => {
  const [step, setStep] = useState<JourneyStep>('hidden');
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [facingRight, setFacingRight] = useState(true);
  const [isWalking, setIsWalking] = useState(false);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>(0);

  // Get element positions
  const getElementPosition = (selector: string, corner: 'top-left' | 'top-right' | 'center' = 'top-right') => {
    const el = document.querySelector(selector);
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    
    switch (corner) {
      case 'top-left':
        return { x: rect.left + scrollX + 20, y: rect.top + scrollY - 8 };
      case 'top-right':
        return { x: rect.right + scrollX - 40, y: rect.top + scrollY - 8 };
      case 'center':
        return { x: rect.left + scrollX + rect.width / 2, y: rect.top + scrollY + rect.height / 2 };
      default:
        return { x: rect.right + scrollX - 40, y: rect.top + scrollY - 8 };
    }
  };

  // Animation helpers
  const animateTo = (
    from: Position, 
    to: Position, 
    duration: number, 
    onComplete: () => void,
    easing: 'linear' | 'easeOut' | 'jump' = 'linear'
  ) => {
    startTimeRef.current = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      
      let easedProgress = progress;
      let yOffset = 0;
      
      if (easing === 'easeOut') {
        easedProgress = 1 - Math.pow(1 - progress, 3);
      } else if (easing === 'jump') {
        easedProgress = 1 - Math.pow(1 - progress, 2);
        // Parabolic arc for jumping
        yOffset = -Math.sin(progress * Math.PI) * 80;
      }
      
      setPosition({
        x: from.x + (to.x - from.x) * easedProgress,
        y: from.y + (to.y - from.y) * easedProgress + yOffset
      });
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        onComplete();
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };

  // Start the journey when dark mode toggle is clicked
  useEffect(() => {
    const handleThemeChange = () => {
      if (step === 'hidden') {
        // Get theme toggle position
        const toggleBtn = document.querySelector('[data-journey-start]');
        if (toggleBtn) {
          const rect = toggleBtn.getBoundingClientRect();
          setPosition({ 
            x: rect.left + window.scrollX + rect.width / 2, 
            y: rect.top + window.scrollY + rect.height 
          });
          setIsVisible(true);
          setStep('emerging');
        }
      }
    };

    // Listen for theme toggle clicks
    const toggleBtn = document.querySelector('[data-journey-start]');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', handleThemeChange);
    }

    return () => {
      if (toggleBtn) {
        toggleBtn.removeEventListener('click', handleThemeChange);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [step]);

  // Journey state machine
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    switch (step) {
      case 'emerging':
        // Emerge animation, then jump to clock
        timeout = setTimeout(() => {
          const clockPos = getElementPosition('[data-journey-clock]', 'top-right');
          if (clockPos) {
            setFacingRight(clockPos.x > position.x);
            setStep('jumping-to-experience'); // Skip to clock first
            animateTo(position, clockPos, 600, () => {
              setStep('at-clock');
            }, 'jump');
          }
        }, 300);
        break;
        
      case 'at-clock':
        setIsWalking(true);
        // Walk slowly across clock
        timeout = setTimeout(() => {
          const clockLeft = getElementPosition('[data-journey-clock]', 'top-left');
          if (clockLeft) {
            setFacingRight(false);
            animateTo(position, { x: position.x - 60, y: position.y }, 1500, () => {
              setIsWalking(false);
              setStep('walking-clock');
            }, 'linear');
          }
        }, 500);
        break;
        
      case 'walking-clock':
        // Jump to experience section
        timeout = setTimeout(() => {
          const expPos = getElementPosition('[data-journey-experience]', 'top-right');
          if (expPos) {
            setFacingRight(expPos.x > position.x);
            animateTo(position, expPos, 500, () => {
              setStep('at-experience');
            }, 'jump');
          }
        }, 300);
        break;
        
      case 'at-experience':
        // Jump to what I do section top-left
        timeout = setTimeout(() => {
          const whatidoPos = getElementPosition('[data-journey-whatido]', 'top-left');
          if (whatidoPos) {
            setFacingRight(whatidoPos.x > position.x);
            animateTo(position, whatidoPos, 500, () => {
              setStep('at-whatido-left');
            }, 'jump');
          }
        }, 800);
        break;
        
      case 'at-whatido-left':
        setIsWalking(true);
        // Walk to top-right of what I do
        timeout = setTimeout(() => {
          const whatidoRight = getElementPosition('[data-journey-whatido]', 'top-right');
          if (whatidoRight) {
            setFacingRight(true);
            animateTo(position, whatidoRight, 2000, () => {
              setIsWalking(false);
              setStep('at-whatido-right');
            }, 'linear');
          }
        }, 300);
        break;
        
      case 'at-whatido-right':
        // Slide down to github
        timeout = setTimeout(() => {
          const githubPos = getElementPosition('[data-journey-github]', 'top-left');
          if (githubPos) {
            setFacingRight(false);
            setStep('sliding-to-github');
            animateTo(position, githubPos, 800, () => {
              setStep('at-github');
            }, 'easeOut');
          }
        }, 500);
        break;
        
      case 'at-github':
        // Wait 2 seconds
        timeout = setTimeout(() => {
          setStep('waiting');
        }, 100);
        break;
        
      case 'waiting':
        // After waiting, jump to jet
        timeout = setTimeout(() => {
          const jetPos = getElementPosition('[data-journey-jet]', 'center');
          if (jetPos) {
            setFacingRight(jetPos.x > position.x);
            animateTo(position, { x: jetPos.x - 50, y: jetPos.y - 20 }, 600, () => {
              setStep('on-jet');
            }, 'jump');
          }
        }, 2000);
        break;
        
      case 'on-jet':
        // Stay on jet, maybe hide after a while
        timeout = setTimeout(() => {
          setIsVisible(false);
          setStep('hidden');
        }, 5000);
        break;
    }
    
    return () => clearTimeout(timeout);
  }, [step, position]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed z-50 pointer-events-none"
      style={{
        left: position.x,
        top: position.y,
        transform: `scaleX(${facingRight ? 1 : -1})`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      <svg 
        viewBox="0 0 60 50" 
        className="w-6 h-5"
        style={{ filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.3))' }}
      >
        {isWalking || step === 'sliding-to-github' ? (
          // Walking/running pose - minimalist black cat
          <>
            {/* Body */}
            <ellipse cx="30" cy="32" rx="18" ry="10" fill="black" />
            
            {/* Head */}
            <circle cx="48" cy="26" r="10" fill="black" />
            
            {/* Ears */}
            <polygon points="44,18 48,8 52,18" fill="black" />
            <polygon points="50,16 55,6 58,16" fill="black" />
            
            {/* Legs with animation */}
            <ellipse cx="18" cy="40" rx="3" ry="6" fill="black"
              style={{ animation: "journeyLegRun 0.12s ease-in-out infinite alternate" }} />
            <ellipse cx="26" cy="40" rx="3" ry="6" fill="black"
              style={{ animation: "journeyLegRun 0.12s ease-in-out infinite alternate-reverse" }} />
            <ellipse cx="36" cy="40" rx="3" ry="6" fill="black"
              style={{ animation: "journeyLegRun 0.12s ease-in-out infinite alternate" }} />
            <ellipse cx="44" cy="40" rx="3" ry="6" fill="black"
              style={{ animation: "journeyLegRun 0.12s ease-in-out infinite alternate-reverse" }} />
            
            {/* Tail */}
            <path d="M12,30 Q4,22 6,32" stroke="black" strokeWidth="4" fill="none" />
            
            {/* Eye */}
            <circle cx="52" cy="24" r="2" fill="#22c55e" />
          </>
        ) : step.includes('jumping') || step === 'emerging' ? (
          // Jumping pose - stretched
          <>
            {/* Stretched body */}
            <ellipse cx="30" cy="28" rx="22" ry="8" fill="black" />
            
            {/* Head */}
            <circle cx="52" cy="22" r="9" fill="black" />
            
            {/* Ears */}
            <polygon points="48,14 52,4 56,14" fill="black" />
            <polygon points="54,12 59,2 60,14" fill="black" />
            
            {/* Extended legs */}
            <path d="M10,32 L4,42" stroke="black" strokeWidth="4" strokeLinecap="round" />
            <path d="M18,34 L14,44" stroke="black" strokeWidth="4" strokeLinecap="round" />
            <path d="M42,34 L48,42" stroke="black" strokeWidth="4" strokeLinecap="round" />
            <path d="M50,30 L56,38" stroke="black" strokeWidth="4" strokeLinecap="round" />
            
            {/* Tail - streaming */}
            <path d="M8,26 Q-2,18 2,28" stroke="black" strokeWidth="4" fill="none" />
            
            {/* Eye */}
            <circle cx="56" cy="20" r="2" fill="#22c55e" />
          </>
        ) : (
          // Sitting/idle pose
          <>
            {/* Body */}
            <ellipse cx="30" cy="34" rx="15" ry="12" fill="black" />
            
            {/* Head */}
            <circle cx="44" cy="22" r="11" fill="black" />
            
            {/* Ears */}
            <polygon points="38,12 44,2 48,12" fill="black" />
            <polygon points="46,10 52,0 56,12" fill="black" />
            
            {/* Front paws */}
            <ellipse cx="24" cy="44" rx="5" ry="4" fill="black" />
            <ellipse cx="36" cy="44" rx="5" ry="4" fill="black" />
            
            {/* Tail with gentle wag */}
            <path 
              d="M15,32 Q6,24 8,34" 
              stroke="black" 
              strokeWidth="4" 
              fill="none"
              style={{ animation: "journeyTailWag 1s ease-in-out infinite alternate" }}
            />
            
            {/* Eye */}
            <circle cx="50" cy="20" r="2.5" fill="#22c55e" />
            
            {/* Occasional blink */}
            <ellipse 
              cx="50" 
              cy="20" 
              rx="2.5" 
              ry="0.5" 
              fill="black"
              style={{ animation: "journeyBlink 3s ease-in-out infinite" }}
            />
          </>
        )}
      </svg>
      
      <style>{`
        @keyframes journeyLegRun {
          0% { transform: translateY(-2px) rotate(-15deg); }
          100% { transform: translateY(2px) rotate(15deg); }
        }
        @keyframes journeyTailWag {
          from { transform: rotate(-10deg); transform-origin: 15px 32px; }
          to { transform: rotate(10deg); transform-origin: 15px 32px; }
        }
        @keyframes journeyBlink {
          0%, 90%, 100% { opacity: 0; }
          95% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default JourneyCat;