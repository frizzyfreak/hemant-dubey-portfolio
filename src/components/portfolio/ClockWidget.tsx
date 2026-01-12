import { useState, useEffect } from "react";

const ClockWidget = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).toUpperCase();
  };

  return (
    <div className="bento-card animate-fade-up flex flex-col items-center justify-center text-center h-full" style={{ animationDelay: "400ms" }}>
      <div className="text-4xl font-bold tracking-widest text-foreground font-digital">
        {formatTime(time)}
      </div>
      <div className="text-xs text-primary mt-2 font-medium">
        Faridabad, Haryana
      </div>
    </div>
  );
};

export default ClockWidget;
