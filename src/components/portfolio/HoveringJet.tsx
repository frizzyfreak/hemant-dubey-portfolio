import { useState, useRef, useEffect } from "react";

const HoveringJet = () => {
  const [jetY, setJetY] = useState(0);
  const [jetTilt, setJetTilt] = useState(0);
  const [flicker, setFlicker] = useState(1);
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchPhase, setLaunchPhase] = useState<'idle' | 'charging' | 'launching' | 'gone'>('idle');
  const containerRef = useRef<HTMLDivElement>(null);
  const targetY = useRef(0);
  const currentY = useRef(0);
  const velocityY = useRef(0);
  const targetTilt = useRef(0);
  const currentTilt = useRef(0);
  const velocityTilt = useRef(0);
  const launchX = useRef(0);
  const launchY = useRef(0);
  const isHovering = useRef(false);

  useEffect(() => {
    let animationId: number;
    let last = performance.now();
    const start = last;

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const animate = (now: number) => {
      // Normalize delta so physics stay identical across refresh rates
      const dt = Math.min((now - last) / 16.6667, 3);
      last = now;
      const t = (now - start) / 1000;

      if (launchPhase === 'idle' || launchPhase === 'charging') {
        // Gentle idle bobbing so the jet always feels airborne
        const bob = isHovering.current || reduceMotion ? 0 : Math.sin(t * 1.4) * 4;
        const bobTilt = isHovering.current || reduceMotion ? 0 : Math.sin(t * 1.4 + 0.6) * 1.2;

        // Critically-damped spring: smooth arrival, no overshoot jitter
        const springY = 0.05;
        const dampY = 0.82;
        velocityY.current += (targetY.current + bob - currentY.current) * springY * dt;
        velocityY.current *= Math.pow(dampY, dt);
        currentY.current += velocityY.current * dt;

        const springT = 0.07;
        const dampT = 0.8;
        velocityTilt.current += (targetTilt.current + bobTilt - currentTilt.current) * springT * dt;
        velocityTilt.current *= Math.pow(dampT, dt);
        currentTilt.current += velocityTilt.current * dt;

        setJetY(currentY.current);
        setJetTilt(currentTilt.current);
      } else if (launchPhase === 'launching') {
        // Launch animation - accelerate to the right and slightly up
        launchX.current += (launchX.current * 0.08 + 8) * dt;
        launchY.current -= 2 * dt;
        currentTilt.current += (15 - currentTilt.current) * 0.15 * dt;
        setJetTilt(currentTilt.current);

        // Check if jet is off screen
        if (launchX.current > window.innerWidth + 500) {
          setLaunchPhase('gone');
        }
      }

      // Layered sine flicker (non-repeating feel) for the exhaust flame
      if (!reduceMotion) {
        const base =
          Math.sin(t * 21.3) * 0.5 +
          Math.sin(t * 34.7 + 1.3) * 0.3 +
          Math.sin(t * 57.1 + 2.4) * 0.2;
        const amount = launchPhase === 'launching' ? 0.14 : launchPhase === 'charging' ? 0.11 : 0.07;
        setFlicker(1 + base * amount);
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [launchPhase]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || launchPhase !== 'idle') return;

    isHovering.current = true;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    // Proportional response: the jet eases away from the cursor
    const offset = (mouseY - rect.height / 2) / (rect.height / 2);
    const clamped = Math.max(-1, Math.min(1, offset));
    targetY.current = -clamped * 32;
    targetTilt.current = -clamped * 9;
  };

  const handleMouseLeave = () => {
    isHovering.current = false;
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
    launchPhase === 'charging' ? 0.6 : Math.min(1, Math.abs(jetY) / 30);

  // Calculate exhaust intensity
  const exhaustScale = (launchPhase === 'launching' ? 2.5 : 
    launchPhase === 'charging' ? 1.8 : 1) * flicker;


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
            viewBox="0 0 200 90" 
            className="w-64 h-24 text-foreground fill-current"
          >
            {/* Side-profile fighter jet (nose to the right) */}

            {/* Far-side wing & stabilizer (depth) */}
            <path d="M118 46 L74 38 L52 36 L60 46 Z" className="fill-muted/40" />
            <path d="M56 45 L30 36 L22 36 L34 46 Z" className="fill-muted/40" />

            {/* Vertical stabilizer (twin tail, far side) */}
            <path d="M58 40 L40 8 L32 8 L34 40 Z" className="fill-muted/50" />

            {/* Main fuselage */}
            <path d="M196 46 
                     C186 43 176 41 166 40 
                     L142 37 L120 36 L96 36 L74 37 L52 39 L34 41 L24 42 
                     L22 50 L24 55 L34 56 L52 57 L74 57 L96 58 L120 58 L142 57 
                     L166 54 C176 52 186 49 196 46 Z" />

            {/* Nose cone highlight */}
            <path d="M196 46 C188 44 182 43 176 42.5 L176 50 C182 49 188 47.5 196 46 Z" className="fill-muted/50" />

            {/* Canopy */}
            <path d="M164 39 C158 28 142 25 130 27 L124 36 L160 40 Z" className="fill-muted" />
            <path d="M161 38 C156 30 144 27.5 134 29 L130 35 L158 38.5 Z" className="fill-muted/60" />
            {/* Canopy frame */}
            <path d="M141 26.5 L136 36 L138 36 L143 27 Z" className="fill-muted/80" />

            {/* Cockpit spine / fairing behind canopy */}
            <path d="M124 36 L100 34 L78 35 L60 38 L60 40 L124 39 Z" className="fill-muted/30" />

            {/* Air intake (under fuselage) */}
            <path d="M138 58 L138 70 L104 70 L98 58 Z" />
            <path d="M136 60 L136 68 L108 68 L104 60 Z" className="fill-muted/60" />

            {/* Near wing (delta, swept) */}
            <path d="M122 55 L86 74 L58 76 L66 56 Z" />
            <path d="M112 57 L88 71 L74 72 L78 57 Z" className="fill-muted/25" />
            {/* Wing pylon + missile */}
            <path d="M92 70 L92 76 L96 76 L96 70 Z" className="fill-muted/70" />
            <path d="M78 76 L104 76 L108 78 L104 80 L78 80 L74 78 Z" className="fill-muted/70" />

            {/* Horizontal stabilizer (near) */}
            <path d="M56 54 L28 66 L14 66 L26 54 Z" />

            {/* Vertical stabilizer (near, canted) */}
            <path d="M62 40 L44 6 L34 6 L30 10 L38 40 Z" />
            <path d="M56 34 L44 12 L40 12 L46 34 Z" className="fill-muted/30" />

            {/* Ventral fin */}
            <path d="M40 56 L28 72 L22 72 L28 56 Z" className="fill-muted/60" />

            {/* Engine exhaust nozzle */}
            <ellipse cx="23" cy="48.5" rx="5" ry="7" className="fill-muted" />
            <ellipse cx="22" cy="48.5" rx="3" ry="5" className="fill-muted/70" />
            <path d="M28 41 L22 42 L20 44 M28 56 L22 55 L20 53" className="stroke-muted/80" strokeWidth="0.8" fill="none" />

            {/* Panel lines & details */}
            <path d="M170 43 L120 42 M170 51 L110 51 M96 40 L60 42" className="stroke-muted/50" strokeWidth="0.7" fill="none" />
            <circle cx="150" cy="49" r="1.6" className="fill-muted/60" />
            <circle cx="156" cy="49" r="1.2" className="fill-muted/50" />
            <path d="M196 46 L200 46" className="stroke-muted-foreground/70" strokeWidth="1" fill="none" />
          </svg>
          

          
          {/* Exhaust trail - scales up during launch */}
          <div 
            className="absolute left-8 top-1/2 -translate-y-1/2 -translate-x-full flex items-center"
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
