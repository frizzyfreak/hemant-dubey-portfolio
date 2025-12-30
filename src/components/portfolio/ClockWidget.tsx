import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";

const ClockWidget = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time in IST
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div className="bento-card animate-fade-up flex flex-col items-center justify-center text-center" style={{ animationDelay: "400ms" }}>
      <div className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground font-mono">
        {formatTime(time)}
      </div>
      <div className="text-sm text-muted-foreground mt-2">{formatDate(time)}</div>
      <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
        <MapPin className="w-3 h-3" />
        <span>Faridabad, Haryana</span>
      </div>
    </div>
  );
};

export default ClockWidget;
