import {
  BookOpen,
  Zap,
  TrendingUp,
  Clock,
  Target,
  Award,
  Play,
  BarChart3,
  Settings,
  Sparkles,
  Rocket,
} from "lucide-react";
import { cn, getSpeedCategory, formatTime } from "../utils";

function HomePage({ readingStats }) {
  const speedCategory = getSpeedCategory(readingStats.averageWPM);

  const stats = [
    {
      icon: BookOpen,
      label: "Words Read",
      value: readingStats.totalWordsRead.toLocaleString(),
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
      borderColor: "border-blue-500/30",
    },
    {
      icon: Clock,
      label: "Time Spent",
      value: formatTime(readingStats.totalTimeSpent),
      color: "text-green-400",
      bgColor: "bg-green-500/20",
      borderColor: "border-green-500/30",
    },
    {
      icon: TrendingUp,
      label: "Avg WPM",
      value: readingStats.averageWPM,
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
      borderColor: "border-purple-500/30",
    },
    {
      icon: Target,
      label: "Sessions",
      value: readingStats.sessionsCompleted,
      color: "text-orange-400",
      bgColor: "bg-orange-500/20",
      borderColor: "border-orange-500/30",
    },
  ];

  const quickActions = [
    {
      title: "Start Reading",
      description: "Begin a new reading session",
      icon: BookOpen,
      href: "/reader",
      gradient: "from-blue-500 to-purple-600",
      delay: 0.1,
    },
    {
      title: "Speed Test",
      description: "Test your reading speed",
      icon: Zap,
      href: "/speed-test",
      gradient: "from-green-500 to-blue-600",
      delay: 0.2,
    },
    {
      title: "View Progress",
      description: "Track your improvement",
      icon: BarChart3,
      href: "/progress",
      gradient: "from-purple-500 to-pink-600",
      delay: 0.3,
    },
    {
      title: "Settings",
      description: "Customize your experience",
      icon: Settings,
      href: "/settings",
      gradient: "from-orange-500 to-red-600",
      delay: 0.4,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-primary/80 rounded-2xl mb-6 shadow-glow">
          <Rocket className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-4">
          Flash Read
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Master the art of speed reading with modern technology and beautiful
          design
        </p>
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {stats.map((stat, statIndex) => (
          <div
            key={stat.label}
            className={cn(
              "p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:scale-105",
              stat.bgColor,
              stat.borderColor
            )}
            style={{ animationDelay: `${statIndex * 0.1}s` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
                <p className={cn("text-2xl font-bold", stat.color)}>
                  {stat.value}
                </p>
              </div>
              <div className={cn("p-3 rounded-xl", stat.bgColor)}>
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-12">
        <div className="flex items-center justify-center mb-8">
          <Sparkles className="w-6 h-6 text-primary mr-2" />
          <h2 className="text-2xl font-bold">Quick Actions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickActions.map((action) => (
            <a
              key={action.title}
              href={action.href}
              className={cn(
                "group relative p-6 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden",
                `bg-gradient-to-r ${action.gradient}`
              )}
              style={{ animationDelay: `${action.delay}s` }}
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-3 bg-white/20 rounded-xl mr-4 backdrop-blur-sm">
                    <action.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{action.title}</h3>
                    <p className="text-white/80 text-sm">
                      {action.description}
                    </p>
                  </div>
                </div>
                <Play className="w-5 h-5 text-white/60 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="mb-8 p-8 rounded-2xl reading-focus">
        <blockquote className="text-center italic text-xl mb-4">
          "Reading is to the mind what exercise is to the body."
        </blockquote>
        <p className="text-center text-muted-foreground">— Joseph Addison</p>
      </div>

      {/* Daily Goal */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-center shadow-glow">
        <h3 className="font-semibold text-lg mb-2">Today's Goal</h3>
        <p className="text-primary-foreground/90">
          Read for at least 15 minutes to maintain your progress
        </p>
      </div>

      {/* Features Preview */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-card border border-border">
          <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Speed Reading</h3>
          <p className="text-muted-foreground text-sm">
            Advanced techniques to increase your reading speed while maintaining
            comprehension.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border">
          <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
            <BarChart3 className="w-6 h-6 text-green-500" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Progress Tracking</h3>
          <p className="text-muted-foreground text-sm">
            Detailed analytics and insights to monitor your reading improvement
            over time.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border">
          <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
            <Award className="w-6 h-6 text-purple-500" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Achievements</h3>
          <p className="text-muted-foreground text-sm">
            Unlock badges and milestones as you progress in your reading
            journey.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
