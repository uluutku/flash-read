import {
  TrendingUp,
  Clock,
  Target,
  Award,
  Calendar,
  BarChart3,
  Zap,
  BookOpen,
  Trophy,
  Star,
  Activity,
  ArrowUpRight,
} from "lucide-react";
import { cn, formatTime, getSpeedCategory } from "../utils";

function Progress({ readingStats }) {
  const speedCategory = getSpeedCategory(readingStats.averageWPM);

  const stats = [
    {
      icon: BookOpen,
      label: "Total Words Read",
      value: readingStats.totalWordsRead.toLocaleString(),
      change: "+12%",
      color: "text-blue-500",
      bgColor: "bg-blue-500/20",
    },
    {
      icon: Clock,
      label: "Total Time Spent",
      value: formatTime(readingStats.totalTimeSpent),
      change: "+8%",
      color: "text-green-500",
      bgColor: "bg-green-500/20",
    },
    {
      icon: TrendingUp,
      label: "Average WPM",
      value: readingStats.averageWPM,
      change: "+15%",
      color: "text-purple-500",
      bgColor: "bg-purple-500/20",
    },
    {
      icon: Target,
      label: "Sessions Completed",
      value: readingStats.sessionsCompleted,
      change: "+5%",
      color: "text-orange-500",
      bgColor: "bg-orange-500/20",
    },
  ];

  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first reading session",
      icon: Star,
      unlocked: readingStats.sessionsCompleted >= 1,
      progress: Math.min(100, (readingStats.sessionsCompleted / 1) * 100),
    },
    {
      id: 2,
      title: "Speed Demon",
      description: "Achieve 300+ WPM in a session",
      icon: Zap,
      unlocked: readingStats.averageWPM >= 300,
      progress: Math.min(100, (readingStats.averageWPM / 300) * 100),
    },
    {
      id: 3,
      title: "Marathon Reader",
      description: "Read for 1 hour total",
      icon: Clock,
      unlocked: readingStats.totalTimeSpent >= 3600000,
      progress: Math.min(100, (readingStats.totalTimeSpent / 3600000) * 100),
    },
    {
      id: 4,
      title: "Word Master",
      description: "Read 10,000 words total",
      icon: BookOpen,
      unlocked: readingStats.totalWordsRead >= 10000,
      progress: Math.min(100, (readingStats.totalWordsRead / 10000) * 100),
    },
    {
      id: 5,
      title: "Consistent Reader",
      description: "Complete 10 reading sessions",
      icon: Trophy,
      unlocked: readingStats.sessionsCompleted >= 10,
      progress: Math.min(100, (readingStats.sessionsCompleted / 10) * 100),
    },
    {
      id: 6,
      title: "Speed Champion",
      description: "Achieve 500+ WPM in a session",
      icon: Award,
      unlocked: readingStats.averageWPM >= 500,
      progress: Math.min(100, (readingStats.averageWPM / 500) * 100),
    },
  ];

  const weeklyData = [
    { day: "Mon", wpm: 180, sessions: 2 },
    { day: "Tue", wpm: 220, sessions: 3 },
    { day: "Wed", wpm: 195, sessions: 1 },
    { day: "Thu", wpm: 250, sessions: 4 },
    { day: "Fri", wpm: 280, sessions: 2 },
    { day: "Sat", wpm: 320, sessions: 5 },
    { day: "Sun", wpm: 240, sessions: 3 },
  ];

  const maxWpm = Math.max(...weeklyData.map((d) => d.wpm));
  const maxSessions = Math.max(...weeklyData.map((d) => d.sessions));

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Progress Dashboard</h1>
            <p className="text-muted-foreground">
              Track your reading improvement over time
            </p>
          </div>
        </div>
      </div>

      {/* Reading Level Badge */}
      <div className="flex justify-center mb-8">
        <div
          className={cn(
            "inline-flex items-center px-6 py-3 rounded-full text-sm font-medium border shadow-glow",
            speedCategory.color
          )}
        >
          <Award className="w-5 h-5 mr-2" />
          {speedCategory.label}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="card hover:shadow-lg transition-all duration-300 hover:scale-105"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="card-content">
              <div className="flex items-center justify-between mb-4">
                <div className={cn("p-3 rounded-xl", stat.bgColor)}>
                  <stat.icon className={cn("w-6 h-6", stat.color)} />
                </div>
                <div className="flex items-center space-x-1 text-green-500">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm font-medium">{stat.change}</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Progress Chart */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Weekly Progress</h3>
            <p className="card-description">
              Your reading performance this week
            </p>
          </div>
          <div className="card-content">
            <div className="space-y-6">
              {/* WPM Chart */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-sm">Words Per Minute</h4>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="text-xs text-muted-foreground">WPM</span>
                  </div>
                </div>
                <div className="flex items-end justify-between h-32 space-x-2">
                  {weeklyData.map((data, index) => (
                    <div
                      key={index}
                      className="flex-1 flex flex-col items-center"
                    >
                      <div
                        className="relative w-full bg-muted rounded-t-lg"
                        style={{ height: "100%" }}
                      >
                        <div
                          className="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all duration-500"
                          style={{ height: `${(data.wpm / maxWpm) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground mt-2">
                        {data.day}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sessions Chart */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-sm">Reading Sessions</h4>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-muted-foreground">
                      Sessions
                    </span>
                  </div>
                </div>
                <div className="flex items-end justify-between h-32 space-x-2">
                  {weeklyData.map((data, index) => (
                    <div
                      key={index}
                      className="flex-1 flex flex-col items-center"
                    >
                      <div
                        className="relative w-full bg-muted rounded-t-lg"
                        style={{ height: "100%" }}
                      >
                        <div
                          className="absolute bottom-0 w-full bg-green-500 rounded-t-lg transition-all duration-500"
                          style={{
                            height: `${(data.sessions / maxSessions) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground mt-2">
                        {data.day}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Achievements</h3>
            <p className="card-description">Unlock badges as you progress</p>
          </div>
          <div className="card-content">
            <div className="grid grid-cols-1 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={cn(
                    "p-4 rounded-xl border transition-all duration-300",
                    achievement.unlocked
                      ? "bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20"
                      : "bg-muted/50 border-border"
                  )}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={cn(
                        "p-3 rounded-xl",
                        achievement.unlocked
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      <achievement.icon className="w-6 h-6" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4
                          className={cn(
                            "font-semibold",
                            achievement.unlocked
                              ? "text-foreground"
                              : "text-muted-foreground"
                          )}
                        >
                          {achievement.title}
                        </h4>
                        {achievement.unlocked && (
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-primary-foreground rounded-full"></div>
                          </div>
                        )}
                      </div>

                      <p
                        className={cn(
                          "text-sm mb-3",
                          achievement.unlocked
                            ? "text-muted-foreground"
                            : "text-muted-foreground/70"
                        )}
                      >
                        {achievement.description}
                      </p>

                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={cn(
                            "h-2 rounded-full transition-all duration-500",
                            achievement.unlocked
                              ? "bg-primary"
                              : "bg-muted-foreground/30"
                          )}
                          style={{ width: `${achievement.progress}%` }}
                        />
                      </div>

                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Progress</span>
                        <span>{Math.round(achievement.progress)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="mt-12">
        <div className="flex items-center justify-center mb-8">
          <Activity className="w-6 h-6 text-primary mr-2" />
          <h2 className="text-2xl font-bold">Reading Insights</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <div className="card-content text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Improvement Trend</h3>
              <p className="text-muted-foreground text-sm">
                Your reading speed has improved by 15% this week. Keep up the
                great work!
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-content text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Consistency</h3>
              <p className="text-muted-foreground text-sm">
                You've been reading consistently for 7 days. This habit will
                lead to significant improvements.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-content text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Next Goal</h3>
              <p className="text-muted-foreground text-sm">
                Try to reach 400 WPM in your next session. You're only 80 WPM
                away!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recent Activity</h2>
          <button className="text-primary hover:text-primary/80 transition-colors">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {[
            {
              type: "session",
              title: "Completed reading session",
              time: "2 hours ago",
              wpm: 320,
            },
            {
              type: "achievement",
              title: 'Unlocked "Speed Demon" achievement',
              time: "1 day ago",
            },
            {
              type: "goal",
              title: "Reached daily reading goal",
              time: "2 days ago",
              wpm: 280,
            },
            {
              type: "session",
              title: "Completed reading session",
              time: "3 days ago",
              wpm: 295,
            },
          ].map((activity, index) => (
            <div key={index} className="card">
              <div className="card-content">
                <div className="flex items-center space-x-4">
                  <div
                    className={cn(
                      "p-3 rounded-xl",
                      activity.type === "achievement" &&
                        "bg-yellow-500/20 text-yellow-500",
                      activity.type === "session" &&
                        "bg-primary/20 text-primary",
                      activity.type === "goal" &&
                        "bg-green-500/20 text-green-500"
                    )}
                  >
                    {activity.type === "achievement" && (
                      <Award className="w-5 h-5" />
                    )}
                    {activity.type === "session" && (
                      <BookOpen className="w-5 h-5" />
                    )}
                    {activity.type === "goal" && <Target className="w-5 h-5" />}
                  </div>

                  <div className="flex-1">
                    <h4 className="font-medium">{activity.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>

                  {activity.wpm && (
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">
                        {activity.wpm}
                      </div>
                      <div className="text-xs text-muted-foreground">WPM</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Progress;
