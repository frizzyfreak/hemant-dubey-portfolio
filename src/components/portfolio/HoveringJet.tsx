const HoveringJet = () => {
  return (
    <div className="bento-card animate-fade-up flex items-center justify-center py-4" style={{ animationDelay: "750ms" }}>
      <div className="relative w-full h-16 overflow-hidden">
        {/* Jet with hovering animation */}
        <div 
          className="absolute animate-jet-fly"
          style={{
            left: '10%',
          }}
        >
          <svg 
            viewBox="0 0 100 40" 
            className="w-16 h-8 text-foreground fill-current"
          >
            {/* Fighter jet silhouette */}
            <path d="M95 20 L75 15 L70 10 L65 10 L60 15 L25 15 L20 5 L15 5 L15 15 L5 18 L5 22 L15 25 L15 35 L20 35 L25 25 L60 25 L65 30 L70 30 L75 25 L95 20 Z" />
            {/* Cockpit */}
            <ellipse cx="78" cy="20" rx="5" ry="4" className="fill-muted" />
            {/* Wings */}
            <path d="M40 15 L30 5 L25 5 L35 15 Z" />
            <path d="M40 25 L30 35 L25 35 L35 25 Z" />
            {/* Tail fins */}
            <path d="M15 15 L10 8 L8 8 L12 15 Z" />
            <path d="M15 25 L10 32 L8 32 L12 25 Z" />
          </svg>
          {/* Exhaust trail */}
          <div className="absolute right-full top-1/2 -translate-y-1/2 flex items-center">
            <div className="w-8 h-1 bg-gradient-to-l from-orange-400 via-yellow-300 to-transparent rounded-full animate-pulse opacity-80" />
            <div className="w-4 h-0.5 bg-gradient-to-l from-yellow-300 to-transparent rounded-full -ml-2 animate-pulse opacity-60" />
          </div>
        </div>
        
        {/* Background clouds for depth */}
        <div className="absolute top-2 left-1/4 w-8 h-2 bg-muted/30 rounded-full animate-cloud-drift" />
        <div className="absolute top-6 left-2/3 w-6 h-1.5 bg-muted/20 rounded-full animate-cloud-drift" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-3 left-1/2 w-10 h-2 bg-muted/25 rounded-full animate-cloud-drift" style={{ animationDelay: '2s' }} />
      </div>
      
      <style>{`
        @keyframes jet-fly {
          0%, 100% {
            transform: translateY(0px) rotate(-2deg);
          }
          25% {
            transform: translateY(-8px) rotate(0deg);
          }
          50% {
            transform: translateY(-4px) rotate(2deg);
          }
          75% {
            transform: translateY(-10px) rotate(-1deg);
          }
        }
        
        @keyframes cloud-drift {
          0%, 100% {
            transform: translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateX(-20px);
            opacity: 0.15;
          }
        }
        
        .animate-jet-fly {
          animation: jet-fly 3s ease-in-out infinite;
        }
        
        .animate-cloud-drift {
          animation: cloud-drift 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HoveringJet;
