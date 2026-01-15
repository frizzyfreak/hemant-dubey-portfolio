import { useState, useRef, useEffect } from "react";

const HoveringJet = () => {
  const [jetY, setJetY] = useState(0);
  const [jetTilt, setJetTilt] = useState(0);
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchPhase, setLaunchPhase] = useState<'idle' | 'charging' | 'launching' | 'gone'>('idle');
  const containerRef = useRef<HTMLDivElement>(null);
  const targetY = useRef(0);
  const currentY = useRef(0);
  const targetTilt = useRef(0);
  const currentTilt = useRef(0);
  const launchX = useRef(0);
  const launchY = useRef(0);

  useEffect(() => {
    let animationId: number;
    
    const animate = () => {
      if (launchPhase === 'idle' || launchPhase === 'charging') {
        // Normal hover animation
        currentY.current += (targetY.current - currentY.current) * 0.08;
        currentTilt.current += (targetTilt.current - currentTilt.current) * 0.1;
        setJetY(currentY.current);
        setJetTilt(currentTilt.current);
      } else if (launchPhase === 'launching') {
        // Launch animation - accelerate to the right and slightly up
        launchX.current += launchX.current * 0.08 + 8;
        launchY.current -= 2;
        currentTilt.current += (15 - currentTilt.current) * 0.15; // Nose up during launch
        setJetTilt(currentTilt.current);
        
        // Check if jet is off screen
        if (launchX.current > window.innerWidth + 500) {
          setLaunchPhase('gone');
        }
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [launchPhase]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || launchPhase !== 'idle') return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    const containerHeight = rect.height;
    const jetCenter = containerHeight / 2;
    
    if (mouseY > jetCenter) {
      targetY.current = -30;
      targetTilt.current = -8;
    } else {
      targetY.current = 30;
      targetTilt.current = 8;
    }
  };

  const handleMouseLeave = () => {
    if (launchPhase !== 'idle') return;
    targetY.current = 0;
    targetTilt.current = 0;
  };

  const handleClick = () => {
    if (launchPhase !== 'idle') return;
    
    // Start charging phase
    setLaunchPhase('charging');
    setIsLaunching(true);
    
    // After a brief charge-up, launch!
    setTimeout(() => {
      setLaunchPhase('launching');
      launchX.current = 0;
      launchY.current = jetY;
    }, 400);
  };

  // Calculate speed line opacity based on movement or launch
  const speedLineIntensity = launchPhase === 'launching' ? 1 : 
    launchPhase === 'charging' ? 0.6 : Math.abs(jetY) / 30;

  // Calculate exhaust intensity
  const exhaustScale = launchPhase === 'launching' ? 2.5 : 
    launchPhase === 'charging' ? 1.8 : 1;

  if (launchPhase === 'gone') {
    return (
      <div 
        className="animate-fade-up flex items-center justify-center py-6" 
        style={{ animationDelay: "750ms" }}
      >
        <div className="relative w-full h-32 overflow-visible flex items-center justify-center">
          <p className="text-muted-foreground text-sm italic animate-fade-in">
            You discovered the Easter EGG!! 🥚✨
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`animate-fade-up flex items-center justify-center py-6 ${launchPhase === 'idle' ? 'cursor-pointer' : 'cursor-default'}`}
      style={{ animationDelay: "750ms" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      data-journey-jet
    >
      <div className="relative w-full h-32 overflow-visible flex items-center justify-center">
        {/* F-22 Raptor style jet with reactive animation - centered */}
        <div 
          className={`relative ${launchPhase === 'charging' ? 'animate-pulse' : ''}`}
          style={{
            transform: `translateX(${launchX.current}px) translateY(${launchPhase === 'launching' ? launchY.current : jetY}px) rotate(${jetTilt}deg)`,
            transition: launchPhase === 'charging' ? 'transform 0.1s ease-out' : 'none',
          }}
        >
          {/* Speed lines / motion blur behind jet */}
          <div 
            className="absolute right-full top-1/2 -translate-y-1/2 flex flex-col gap-1 pr-2"
            style={{ 
              opacity: speedLineIntensity * 0.8,
              transform: `scaleX(${launchPhase === 'launching' ? 3 : 1})`,
              transformOrigin: 'right center',
              transition: 'transform 0.3s ease-out'
            }}
          >
            <div className="w-32 h-[2px] bg-gradient-to-l from-muted-foreground/60 to-transparent rounded-full" />
            <div className="w-24 h-[1.5px] bg-gradient-to-l from-muted-foreground/40 to-transparent rounded-full -ml-4" />
            <div className="w-28 h-[2px] bg-gradient-to-l from-muted-foreground/50 to-transparent rounded-full -ml-2" />
            <div className="w-20 h-[1.5px] bg-gradient-to-l from-muted-foreground/30 to-transparent rounded-full -ml-6" />
            <div className="w-36 h-[2px] bg-gradient-to-l from-muted-foreground/40 to-transparent rounded-full" />
          </div>
          
          <svg 
            viewBox="0 0 200 80" 
            className="w-64 h-24 text-foreground fill-current"
          >
            {/* F-22 Raptor silhouette */}
            <path d="M195 40 L180 38 L175 35 L160 32 L140 30 L120 28 L80 26 L60 25 L40 24 L25 26 L15 30 L8 35 L5 40 L8 45 L15 50 L25 54 L40 56 L60 55 L80 54 L120 52 L140 50 L160 48 L175 45 L180 42 L195 40 Z" />
            <path d="M195 40 L185 38 L185 42 L195 40 Z" className="fill-muted/50" />
            <ellipse cx="165" cy="40" rx="15" ry="5" className="fill-muted" />
            <ellipse cx="165" cy="40" rx="12" ry="3" className="fill-muted/70" />
            <path d="M100 26 L50 5 L35 3 L30 5 L55 26 Z" />
            <path d="M100 54 L50 75 L35 77 L30 75 L55 54 Z" />
            <path d="M80 26 L60 12 L55 12 L70 26 Z" className="fill-muted/30" />
            <path d="M80 54 L60 68 L55 68 L70 54 Z" className="fill-muted/30" />
            <path d="M35 24 L25 8 L20 8 L18 10 L28 26 Z" />
            <path d="M35 56 L25 72 L20 72 L18 70 L28 54 Z" />
            <path d="M45 26 L35 18 L30 18 L38 26 Z" />
            <path d="M45 54 L35 62 L30 62 L38 54 Z" />
            <ellipse cx="85" cy="34" rx="10" ry="3" className="fill-muted/40" />
            <ellipse cx="85" cy="46" rx="10" ry="3" className="fill-muted/40" />
            <ellipse cx="18" cy="35" rx="4" ry="2" className="fill-muted/60" />
            <ellipse cx="18" cy="45" rx="4" ry="2" className="fill-muted/60" />
          </svg>
          
          {/* Exhaust trail - scales up during launch */}
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full flex items-center"
            style={{
              transform: `translateX(-100%) translateY(-50%) scaleX(${exhaustScale})`,
              transformOrigin: 'right center',
              transition: 'transform 0.2s ease-out'
            }}
          >
            <div className={`w-20 h-3 bg-gradient-to-l from-orange-500 via-orange-400 to-yellow-300 rounded-full animate-pulse ${launchPhase === 'launching' ? 'opacity-100' : 'opacity-90'}`} />
            <div className={`w-12 h-2 bg-gradient-to-l from-yellow-300 via-yellow-200 to-transparent rounded-full -ml-6 animate-pulse ${launchPhase === 'launching' ? 'opacity-90' : 'opacity-70'}`} />
            <div className={`w-6 h-1 bg-gradient-to-l from-yellow-200 to-transparent rounded-full -ml-3 animate-pulse ${launchPhase === 'launching' ? 'opacity-70' : 'opacity-50'}`} />
            {/* Extra flame during launch */}
            {(launchPhase === 'charging' || launchPhase === 'launching') && (
              <>
                <div className="absolute w-16 h-4 bg-gradient-to-l from-blue-400 via-blue-300 to-transparent rounded-full -ml-14 animate-pulse opacity-60" />
                <div className="absolute w-24 h-2 bg-gradient-to-l from-white via-blue-200 to-transparent rounded-full -ml-20 animate-pulse opacity-40" />
              </>
            )}
          </div>
          
          {/* Sonic boom effect during launch */}
          {launchPhase === 'launching' && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="w-32 h-32 border-2 border-muted-foreground/30 rounded-full animate-ping" />
              <div className="absolute top-0 left-0 w-32 h-32 border border-muted-foreground/20 rounded-full animate-ping" style={{ animationDelay: '0.1s' }} />
            </div>
          )}
        </div>
        
        {/* Fast-moving clouds to simulate flight */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Layer 1 - Fastest, closest clouds */}
          <div className="absolute top-2 animate-cloud-fast" style={{ right: '-80px' }}>
            <div className="relative">
              <div className="absolute w-6 h-4 bg-sky-300/50 rounded-full" />
              <div className="absolute w-5 h-4 bg-sky-300/50 rounded-full left-4 top-1" />
              <div className="absolute w-7 h-5 bg-sky-300/50 rounded-full left-2 -top-1" />
              <div className="absolute w-4 h-3 bg-sky-300/50 rounded-full left-8 top-1" />
            </div>
          </div>
          <div className="absolute top-10 animate-cloud-fast" style={{ right: '-60px', animationDelay: '0.3s' }}>
            <div className="relative">
              <div className="absolute w-5 h-3 bg-sky-200/45 rounded-full" />
              <div className="absolute w-4 h-3 bg-sky-200/45 rounded-full left-3 -top-1" />
              <div className="absolute w-5 h-4 bg-sky-200/45 rounded-full left-1 top-1" />
            </div>
          </div>
          <div className="absolute bottom-3 animate-cloud-fast" style={{ right: '-100px', animationDelay: '0.6s' }}>
            <div className="relative">
              <div className="absolute w-8 h-5 bg-sky-300/50 rounded-full" />
              <div className="absolute w-6 h-4 bg-sky-300/50 rounded-full left-5 -top-1" />
              <div className="absolute w-7 h-5 bg-sky-300/50 rounded-full left-3 top-1" />
              <div className="absolute w-5 h-4 bg-sky-300/50 rounded-full left-10 top-0" />
            </div>
          </div>
          <div className="absolute top-1/2 animate-cloud-fast" style={{ right: '-70px', animationDelay: '0.9s' }}>
            <div className="relative">
              <div className="absolute w-5 h-4 bg-sky-200/40 rounded-full" />
              <div className="absolute w-4 h-3 bg-sky-200/40 rounded-full left-3 -top-1" />
              <div className="absolute w-5 h-4 bg-sky-200/40 rounded-full left-1 top-1" />
            </div>
          </div>
          
          {/* Layer 2 - Medium speed clouds */}
          <div className="absolute top-6 animate-cloud-medium" style={{ right: '-50px', animationDelay: '0.2s' }}>
            <div className="relative">
              <div className="absolute w-4 h-3 bg-sky-200/35 rounded-full" />
              <div className="absolute w-3 h-2 bg-sky-200/35 rounded-full left-2 -top-1" />
              <div className="absolute w-4 h-3 bg-sky-200/35 rounded-full left-1 top-0" />
            </div>
          </div>
          <div className="absolute bottom-8 animate-cloud-medium" style={{ right: '-40px', animationDelay: '0.5s' }}>
            <div className="relative">
              <div className="absolute w-3 h-2 bg-sky-100/30 rounded-full" />
              <div className="absolute w-4 h-3 bg-sky-100/30 rounded-full left-2 -top-1" />
              <div className="absolute w-3 h-2 bg-sky-100/30 rounded-full left-4 top-0" />
            </div>
          </div>
          <div className="absolute top-1/3 animate-cloud-medium" style={{ right: '-60px', animationDelay: '0.8s' }}>
            <div className="relative">
              <div className="absolute w-5 h-3 bg-sky-200/35 rounded-full" />
              <div className="absolute w-4 h-3 bg-sky-200/35 rounded-full left-3 -top-1" />
              <div className="absolute w-5 h-4 bg-sky-200/35 rounded-full left-1 top-0" />
            </div>
          </div>
          
          {/* Layer 3 - Slower, distant clouds */}
          <div className="absolute top-1 animate-cloud-slow" style={{ right: '-30px', animationDelay: '0.4s' }}>
            <div className="relative">
              <div className="absolute w-3 h-2 bg-sky-100/25 rounded-full" />
              <div className="absolute w-2 h-2 bg-sky-100/25 rounded-full left-2 -top-0.5" />
            </div>
          </div>
          <div className="absolute bottom-2 animate-cloud-slow" style={{ right: '-40px', animationDelay: '0.7s' }}>
            <div className="relative">
              <div className="absolute w-3 h-2 bg-sky-100/25 rounded-full" />
              <div className="absolute w-3 h-2 bg-sky-100/25 rounded-full left-2 -top-0.5" />
              <div className="absolute w-2 h-2 bg-sky-100/25 rounded-full left-4 top-0" />
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes cloud-fast {
          0% {
            transform: translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateX(-500px);
            opacity: 0;
          }
        }
        
        @keyframes cloud-medium {
          0% {
            transform: translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.35;
          }
          90% {
            opacity: 0.35;
          }
          100% {
            transform: translateX(-500px);
            opacity: 0;
          }
        }
        
        @keyframes cloud-slow {
          0% {
            transform: translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.2;
          }
          90% {
            opacity: 0.2;
          }
          100% {
            transform: translateX(-400px);
            opacity: 0;
          }
        }
        
        .animate-cloud-fast {
          animation: cloud-fast 1.2s linear infinite;
        }
        
        .animate-cloud-medium {
          animation: cloud-medium 1.8s linear infinite;
        }
        
        .animate-cloud-slow {
          animation: cloud-slow 2.5s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default HoveringJet;
