import { useState, useRef, useEffect } from "react";

const HoveringJet = () => {
  const [jetY, setJetY] = useState(0);
  const [jetTilt, setJetTilt] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const targetY = useRef(0);
  const currentY = useRef(0);
  const targetTilt = useRef(0);
  const currentTilt = useRef(0);

  useEffect(() => {
    let animationId: number;
    
    const animate = () => {
      // Smooth interpolation towards target
      currentY.current += (targetY.current - currentY.current) * 0.08;
      currentTilt.current += (targetTilt.current - currentTilt.current) * 0.1;
      setJetY(currentY.current);
      setJetTilt(currentTilt.current);
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    const containerHeight = rect.height;
    const jetCenter = containerHeight / 2;
    
    // If mouse is below center, jet flies up; if above, jet flies down
    if (mouseY > jetCenter) {
      targetY.current = -30; // Fly up
      targetTilt.current = -8; // Tilt nose up
    } else {
      targetY.current = 30; // Fly down
      targetTilt.current = 8; // Tilt nose down
    }
  };

  const handleMouseLeave = () => {
    targetY.current = 0; // Return to center
    targetTilt.current = 0; // Level out
  };

  // Calculate speed line opacity based on movement
  const speedLineIntensity = Math.abs(jetY) / 30;

  return (
    <div 
      ref={containerRef}
      className="animate-fade-up flex items-center justify-center py-6 cursor-pointer" 
      style={{ animationDelay: "750ms" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full h-32 overflow-visible flex items-center justify-center">
        {/* F-22 Raptor style jet with reactive animation - centered */}
        <div 
          className="relative transition-none"
          style={{
            transform: `translateY(${jetY}px) rotate(${jetTilt}deg)`,
          }}
        >
          {/* Speed lines / motion blur behind jet */}
          <div 
            className="absolute right-full top-1/2 -translate-y-1/2 flex flex-col gap-1 pr-2"
            style={{ opacity: speedLineIntensity * 0.8 }}
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
            {/* F-22 Raptor silhouette - top-left style from reference */}
            {/* Main fuselage */}
            <path d="M195 40 L180 38 L175 35 L160 32 L140 30 L120 28 L80 26 L60 25 L40 24 L25 26 L15 30 L8 35 L5 40 L8 45 L15 50 L25 54 L40 56 L60 55 L80 54 L120 52 L140 50 L160 48 L175 45 L180 42 L195 40 Z" />
            {/* Nose cone */}
            <path d="M195 40 L185 38 L185 42 L195 40 Z" className="fill-muted/50" />
            {/* Cockpit canopy */}
            <ellipse cx="165" cy="40" rx="15" ry="5" className="fill-muted" />
            <ellipse cx="165" cy="40" rx="12" ry="3" className="fill-muted/70" />
            {/* Main delta wings */}
            <path d="M100 26 L50 5 L35 3 L30 5 L55 26 Z" />
            <path d="M100 54 L50 75 L35 77 L30 75 L55 54 Z" />
            {/* Wing details */}
            <path d="M80 26 L60 12 L55 12 L70 26 Z" className="fill-muted/30" />
            <path d="M80 54 L60 68 L55 68 L70 54 Z" className="fill-muted/30" />
            {/* Tail fins / Vertical stabilizers */}
            <path d="M35 24 L25 8 L20 8 L18 10 L28 26 Z" />
            <path d="M35 56 L25 72 L20 72 L18 70 L28 54 Z" />
            {/* Horizontal stabilizers */}
            <path d="M45 26 L35 18 L30 18 L38 26 Z" />
            <path d="M45 54 L35 62 L30 62 L38 54 Z" />
            {/* Engine intakes */}
            <ellipse cx="85" cy="34" rx="10" ry="3" className="fill-muted/40" />
            <ellipse cx="85" cy="46" rx="10" ry="3" className="fill-muted/40" />
            {/* Engine exhaust nozzles */}
            <ellipse cx="18" cy="35" rx="4" ry="2" className="fill-muted/60" />
            <ellipse cx="18" cy="45" rx="4" ry="2" className="fill-muted/60" />
          </svg>
          
          {/* Exhaust trail */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full flex items-center">
            <div className="w-20 h-3 bg-gradient-to-l from-orange-500 via-orange-400 to-yellow-300 rounded-full animate-pulse opacity-90" />
            <div className="w-12 h-2 bg-gradient-to-l from-yellow-300 via-yellow-200 to-transparent rounded-full -ml-6 animate-pulse opacity-70" />
            <div className="w-6 h-1 bg-gradient-to-l from-yellow-200 to-transparent rounded-full -ml-3 animate-pulse opacity-50" />
          </div>
        </div>
        
        {/* Background clouds for depth */}
        <div className="absolute top-4 left-1/4 w-12 h-3 bg-muted/30 rounded-full animate-cloud-drift" />
        <div className="absolute top-10 left-2/3 w-10 h-2 bg-muted/20 rounded-full animate-cloud-drift" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-6 left-1/2 w-16 h-3 bg-muted/25 rounded-full animate-cloud-drift" style={{ animationDelay: '2s' }} />
      </div>
      
      <style>{`
        @keyframes cloud-drift {
          0%, 100% {
            transform: translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateX(-30px);
            opacity: 0.15;
          }
        }
        
        .animate-cloud-drift {
          animation: cloud-drift 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HoveringJet;
