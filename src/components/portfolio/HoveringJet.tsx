const HoveringJet = () => {
  return (
    <div className="bento-card animate-fade-up flex items-center justify-center h-full" style={{ animationDelay: "750ms" }}>
      <div className="relative">
        {/* Fighter jet SVG with hovering animation */}
        <svg 
          width="80" 
          height="40" 
          viewBox="0 0 80 40" 
          className="fill-foreground/70 animate-hover-jet"
        >
          {/* Main fuselage */}
          <ellipse cx="40" cy="20" rx="35" ry="6" />
          
          {/* Nose cone */}
          <polygon points="75,20 85,20 75,18 75,22" />
          
          {/* Cockpit */}
          <ellipse cx="55" cy="18" rx="8" ry="3" className="fill-primary/30" />
          
          {/* Main wings */}
          <polygon points="35,14 25,0 45,14" />
          <polygon points="35,26 25,40 45,26" />
          
          {/* Tail fins */}
          <polygon points="8,14 0,5 15,14" />
          <polygon points="8,26 0,35 15,26" />
          
          {/* Vertical stabilizer */}
          <polygon points="10,14 5,8 15,14" />
          
          {/* Engine exhaust */}
          <ellipse cx="5" cy="20" rx="3" ry="4" className="fill-muted-foreground/50" />
          
          {/* Wing details */}
          <line x1="25" y1="7" x2="42" y2="14" className="stroke-muted-foreground/30" strokeWidth="0.5" />
          <line x1="25" y1="33" x2="42" y2="26" className="stroke-muted-foreground/30" strokeWidth="0.5" />
        </svg>
        
        {/* Exhaust trail effect */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 flex gap-0.5">
          <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse" style={{ animationDelay: "0ms" }} />
          <div className="w-1 h-1 rounded-full bg-primary/30 animate-pulse" style={{ animationDelay: "100ms" }} />
          <div className="w-0.5 h-0.5 rounded-full bg-primary/20 animate-pulse" style={{ animationDelay: "200ms" }} />
        </div>
      </div>
      
      <style>{`
        @keyframes hoverJet {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-6px) rotate(1deg); }
          50% { transform: translateY(0px) rotate(0deg); }
          75% { transform: translateY(6px) rotate(-1deg); }
        }
        .animate-hover-jet {
          animation: hoverJet 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HoveringJet;
