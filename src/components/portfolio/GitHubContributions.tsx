import { useMemo } from "react";

const GitHubContributions = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = ["Mon", "Wed", "Fri"];

  // Generate contribution data for 52 weeks (full year)
  const contributions = useMemo(() => {
    const weeks = 52;
    const daysPerWeek = 7;
    const data: number[][] = [];
    
    for (let w = 0; w < weeks; w++) {
      const week: number[] = [];
      for (let d = 0; d < daysPerWeek; d++) {
        // Generate realistic contribution patterns with some seasonal variation
        const seasonMultiplier = Math.sin((w / 52) * Math.PI * 2) * 0.3 + 0.7;
        const base = Math.random() * seasonMultiplier;
        let level = 0;
        if (base > 0.3) level = 1;
        if (base > 0.5) level = 2;
        if (base > 0.7) level = 3;
        if (base > 0.85) level = 4;
        week.push(level);
      }
      data.push(week);
    }
    return data;
  }, []);

  const getContributionColor = (level: number) => {
    const colors = [
      "bg-muted/30 dark:bg-[hsl(120,100%,8%)]",
      "bg-emerald-200 dark:bg-[hsl(120,60%,20%)]",
      "bg-emerald-400 dark:bg-[hsl(120,60%,30%)]",
      "bg-emerald-500 dark:bg-[hsl(120,60%,40%)]",
      "bg-emerald-600 dark:bg-[hsl(120,60%,50%)]",
    ];
    return colors[level] || colors[0];
  };

  const totalContributions = contributions.flat().reduce((sum, level) => sum + level * 3, 0);

  // Calculate month positions for labels
  const getMonthLabels = () => {
    const labels: { month: string; position: number }[] = [];
    const weeksPerMonth = 52 / 12;
    
    for (let i = 0; i < 12; i++) {
      labels.push({
        month: months[i],
        position: Math.floor(i * weeksPerMonth),
      });
    }
    return labels;
  };

  const monthLabels = getMonthLabels();

  return (
    <div className="bento-card animate-fade-up h-full" style={{ animationDelay: "700ms" }}>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {totalContributions} contributions in the last year
        </h2>
      </div>
      <div className="border-t border-border mb-3" />
      
      <div className="overflow-x-auto">
        <div className="min-w-max">
          {/* Month labels */}
          <div className="flex mb-1 ml-8">
            {monthLabels.map((label, index) => (
              <div
                key={index}
                className="text-[9px] text-muted-foreground"
                style={{ 
                  width: `${(52 / 12) * 10}px`,
                  paddingLeft: index === 0 ? 0 : 4
                }}
              >
                {label.month}
              </div>
            ))}
          </div>
          
          <div className="flex">
            {/* Day labels */}
            <div className="flex flex-col justify-around mr-2 h-[70px]">
              {days.map((day) => (
                <span key={day} className="text-[9px] text-muted-foreground leading-none">
                  {day}
                </span>
              ))}
            </div>
            
            {/* Contribution grid */}
            <div className="flex gap-[2px]">
              {contributions.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[2px]">
                  {week.map((level, dayIndex) => (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className={`w-[9px] h-[9px] rounded-[2px] ${getContributionColor(level)} transition-all duration-200 hover:scale-125 hover:ring-1 hover:ring-primary/50`}
                      title={`${level * 3} contributions`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-end mt-3 gap-1 text-[9px] text-muted-foreground">
        <span>Less</span>
        <div className="flex gap-[2px]">
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`w-[9px] h-[9px] rounded-[2px] ${getContributionColor(level)}`}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

export default GitHubContributions;
