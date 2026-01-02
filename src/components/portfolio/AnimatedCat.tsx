import { useState, useEffect } from "react";

const AnimatedCat = () => {
  const [position, setPosition] = useState({ x: 0, y: 80 });
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left
  const [isJumping, setIsJumping] = useState(false);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setPosition((prev) => {
        const newX = prev.x + direction * 2;
        const maxX = window.innerWidth - 40;
        
        if (newX >= maxX || newX <= 0) {
          setDirection((d) => -d);
          return { ...prev, x: Math.max(0, Math.min(maxX, newX)) };
        }
        
        return { ...prev, x: newX };
      });
    }, 50);

    const jumpInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsJumping(true);
        setTimeout(() => setIsJumping(false), 400);
      }
    }, 3000);

    return () => {
      clearInterval(moveInterval);
      clearInterval(jumpInterval);
    };
  }, [direction]);

  return (
    <div
      className="fixed z-50 pointer-events-none transition-transform duration-200"
      style={{
        left: position.x,
        bottom: position.y,
        transform: `scaleX(${direction}) ${isJumping ? "translateY(-20px)" : "translateY(0)"}`,
      }}
    >
      <div className="relative">
        {/* Cat body */}
        <div className="relative w-8 h-6 bg-foreground/80 rounded-full">
          {/* Ears */}
          <div className="absolute -top-2 left-1 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-foreground/80" />
          <div className="absolute -top-2 right-1 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-foreground/80" />
          
          {/* Eyes */}
          <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
          <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
          
          {/* Nose */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-1 h-0.5 bg-primary/60 rounded-full" />
        </div>
        
        {/* Tail */}
        <div 
          className="absolute -right-3 top-1 w-4 h-1.5 bg-foreground/80 rounded-full origin-left"
          style={{
            animation: "tailWag 0.5s ease-in-out infinite alternate",
          }}
        />
        
        {/* Legs */}
        <div className="absolute bottom-0 left-1 w-1 h-2 bg-foreground/80 rounded-full" />
        <div className="absolute bottom-0 right-1 w-1 h-2 bg-foreground/80 rounded-full" />
      </div>
      
      <style>{`
        @keyframes tailWag {
          from { transform: rotate(-15deg); }
          to { transform: rotate(15deg); }
        }
      `}</style>
    </div>
  );
};

export default AnimatedCat;
