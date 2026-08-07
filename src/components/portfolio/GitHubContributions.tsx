import { ArrowUpRight } from "lucide-react";
import {
  contributionWeeks,
  monthLabels,
  totalContributions,
  contributionYear,
} from "@/data/github-contributions";

const GITHUB_USERNAME = "Frizzyfreak";

const dayLabels = ["Mon", "Wed", "Fri"];

const getContributionColor = (level: number) => {
  const colors = [
    "bg-muted/50 dark:bg-[hsl(120,100%,8%)]",
    "bg-emerald-200 dark:bg-[hsl(120,60%,20%)]",
    "bg-emerald-400 dark:bg-[hsl(120,60%,30%)]",
    "bg-emerald-500 dark:bg-[hsl(120,60%,40%)]",
    "bg-emerald-600 dark:bg-[hsl(120,60%,50%)]",
  ];
  return colors[level] || colors[0];
};

const GitHubContributions = () => {
  return (
    <div className="bento-card animate-fade-up" style={{ animationDelay: "700ms" }} data-journey-github>
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <h2 className="text-sm sm:text-base font-normal text-foreground">
          {totalContributions} contributions in {contributionYear}
        </h2>
        <a
          href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          title="Opens GitHub in a new tab"
          className="group flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          View GitHub Repositories
          <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* Calendar panel */}
      <div className="rounded-md border border-border p-3">
        {/* Month labels */}
        <div className="flex gap-[2px] mb-1 ml-7">
          {contributionWeeks.map((_, weekIndex) => {
            const label = monthLabels.find((m) => m.week === weekIndex)?.label;
            return (
              <div key={weekIndex} className="flex-1 relative h-3">
                {label && (
                  <span className="absolute left-0 top-0 text-[10px] text-muted-foreground leading-none">
                    {label}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex">
          {/* Day labels */}
          <div className="flex flex-col justify-around mr-1 h-[56px] w-6">
            {dayLabels.map((day) => (
              <span key={day} className="text-[10px] text-muted-foreground leading-none">
                {day}
              </span>
            ))}
          </div>

          {/* Contribution grid */}
          <div className="flex gap-[2px] flex-1">
            {contributionWeeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[2px] flex-1">
                {week.map((level, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`aspect-square rounded-[2px] ${
                      level < 0 ? "opacity-0" : getContributionColor(level)
                    } transition-all duration-200 hover:scale-150 hover:ring-1 hover:ring-primary/50`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-3">
          <a
            href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/viewing-contributions-on-your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-muted-foreground hover:text-primary hover:underline"
          >
            Learn how we count contributions
          </a>
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <span>Less</span>
            <div className="flex gap-[2px]">
              {[0, 1, 2, 3, 4].map((level) => (
                <div key={level} className={`w-2.5 h-2.5 rounded-[2px] ${getContributionColor(level)}`} />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubContributions;
