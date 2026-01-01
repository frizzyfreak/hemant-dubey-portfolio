import { useMemo } from "react";

const GitHubContributions = () => {
  // Generate contribution data for the last 20 weeks (to fit the card)
  const contributions = useMemo(() => {
    const weeks = 16;
    const days = 7;
    const data: number[][] = [];
    
    for (let w = 0; w < weeks; w++) {
      const week: number[] = [];
      for (let d = 0; d < days; d++) {
        // Generate realistic contribution patterns
        const base = Math.random();
        let level = 0;
        if (base > 0.4) level = 1;
        if (base > 0.6) level = 2;
        if (base > 0.8) level = 3;
        if (base > 0.92) level = 4;
        week.push(level);
      }
      data.push(week);
    }
    return data;
  }, []);

  const getContributionColor = (level: number) => {
    const colors = [
      "bg-muted/50 dark:bg-[hsl(120,100%,10%)]",
      "bg-emerald-200 dark:bg-[hsl(120,100%,20%)]",
      "bg-emerald-400 dark:bg-[hsl(120,100%,30%)]",
      "bg-emerald-500 dark:bg-[hsl(120,100%,40%)]",
      "bg-emerald-600 dark:bg-[hsl(120,100%,50%)]",
    ];
    return colors[level] || colors[0];
  };

  const totalContributions = contributions.flat().reduce((sum, level) => sum + level * 2, 0);

  return (
    <div className="bento-card animate-fade-up h-full" style={{ animationDelay: "700ms" }}>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">GitHub Activity</h2>
        <span className="text-[10px] text-muted-foreground">{totalContributions} contributions</span>
      </div>
      <div className="border-t border-border mb-3" />
      
      <div className="flex gap-0.5 overflow-hidden">
        {contributions.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-0.5">
            {week.map((level, dayIndex) => (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className={`w-2.5 h-2.5 rounded-sm ${getContributionColor(level)} transition-all duration-200 hover:scale-125 hover:ring-1 hover:ring-primary/50`}
                title={`${level * 2} contributions`}
              />
            ))}
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-between mt-3 text-[9px] text-muted-foreground">
        <span>Less</span>
        <div className="flex gap-0.5">
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`w-2.5 h-2.5 rounded-sm ${getContributionColor(level)}`}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

export default GitHubContributions;
