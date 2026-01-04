const HoveringJet = () => {
  return (
    <div className="animate-fade-up flex items-center justify-center py-6" style={{ animationDelay: "750ms" }}>
      <div className="relative w-full h-32 overflow-visible">
        {/* Jet with hovering animation */}
        <div 
          className="absolute animate-jet-fly"
          style={{
            left: '20%',
          }}
        >
          <svg 
            viewBox="0 0 200 60" 
            className="w-64 h-24 text-foreground fill-current"
          >
            {/* F/A-18 Hornet style fighter jet silhouette */}
            {/* Main fuselage */}
            <path d="M190 30 L170 25 L165 18 L155 15 L145 18 L140 22 L50 22 L45 12 L35 10 L30 12 L25 18 L10 25 L5 30 L10 35 L25 42 L30 48 L35 50 L45 48 L50 38 L140 38 L145 42 L155 45 L165 42 L170 35 L190 30 Z" />
            {/* Cockpit */}
            <ellipse cx="165" cy="30" rx="12" ry="6" className="fill-muted" />
            {/* Main wings */}
            <path d="M85 22 L60 5 L50 5 L75 22 Z" />
            <path d="M85 38 L60 55 L50 55 L75 38 Z" />
            {/* Tail fins */}
            <path d="M30 18 L20 5 L15 5 L25 18 Z" />
            <path d="M30 42 L20 55 L15 55 L25 42 Z" />
            {/* Vertical stabilizers */}
            <path d="M40 22 L35 8 L32 8 L38 22 Z" />
            <path d="M40 38 L35 52 L32 52 L38 38 Z" />
            {/* Engine intakes */}
            <ellipse cx="120" cy="25" rx="8" ry="3" className="fill-muted/50" />
            <ellipse cx="120" cy="35" rx="8" ry="3" className="fill-muted/50" />
          </svg>
          {/* Exhaust trail */}
          <div className="absolute right-full top-1/2 -translate-y-1/2 flex items-center">
            <div className="w-16 h-2 bg-gradient-to-l from-orange-400 via-yellow-300 to-transparent rounded-full animate-pulse opacity-80" />
            <div className="w-8 h-1 bg-gradient-to-l from-yellow-300 to-transparent rounded-full -ml-4 animate-pulse opacity-60" />
          </div>
        </div>
        
        {/* Background clouds for depth */}
        <div className="absolute top-4 left-1/4 w-12 h-3 bg-muted/30 rounded-full animate-cloud-drift" />
        <div className="absolute top-10 left-2/3 w-10 h-2 bg-muted/20 rounded-full animate-cloud-drift" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-6 left-1/2 w-16 h-3 bg-muted/25 rounded-full animate-cloud-drift" style={{ animationDelay: '2s' }} />
      </div>
      
      <style>{`
        @keyframes jet-fly {
          0%, 100% {
            transform: translateY(0px) rotate(-2deg);
          }
          25% {
            transform: translateY(-12px) rotate(0deg);
          }
          50% {
            transform: translateY(-6px) rotate(2deg);
          }
          75% {
            transform: translateY(-16px) rotate(-1deg);
          }
        }
        
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
