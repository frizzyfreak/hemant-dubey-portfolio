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
    <div className="bento-card animate-fade-up flex flex-col items-center justify-center text-center py-6" style={{ animationDelay: "400ms" }}>
      <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-4 self-start">Clock</h2>
      <div className="text-4xl font-bold tracking-widest text-foreground font-digital">
        {formatTime(time)}
      </div>
      <div className="text-sm text-primary mt-3 font-medium">
        Faridabad, Haryana
      </div>
    </div>
  );
};

export default ClockWidget;
