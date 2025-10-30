import {
  User,
  Briefcase,
  GraduationCap,
  Code2,
  FolderGit2,
  Terminal,
} from "lucide-react"
import { WindowType } from "./Desktop"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

interface DockProps {
  onOpenWindow: (type: WindowType) => void
  activeWindows: Array<{ type: WindowType; minimized: boolean }>
}

const Dock = ({ onOpenWindow, activeWindows }: DockProps) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  const apps = [
    { type: "about" as WindowType, icon: User, label: "About Me" },
    { type: "experience" as WindowType, icon: Briefcase, label: "Experience" },
    {
      type: "education" as WindowType,
      icon: GraduationCap,
      label: "Education",
    },
    { type: "skills" as WindowType, icon: Code2, label: "Skills" },
    { type: "projects" as WindowType, icon: FolderGit2, label: "Projects" },
    { type: "terminal" as WindowType, icon: Terminal, label: "Terminal" },
  ]

  const isActive = (type: WindowType) => {
    return activeWindows.some((w) => w.type === type && !w.minimized)
  }

  return (
    <div
      className={cn(
        "fixed z-50",
        isMobile
          ? "bottom-2 left-1/2 -translate-x-1/2"
          : "left-0 top-1/2 -translate-y-1/2 ml-2"
      )}
    >
      <div className="bg-dock-bg backdrop-blur-md rounded-2xl p-2 border border-window-border shadow-2xl">
        <div className={cn("flex gap-1", isMobile ? "flex-row" : "flex-col")}>
          {apps.map((app) => {
            const Icon = app.icon
            const active = isActive(app.type)

            return (
              <button
                key={app.type}
                onClick={() => onOpenWindow(app.type)}
                className={cn(
                  "group relative transition-all duration-300",
                  "hover:bg-ubuntu-orange/20",
                  active && "bg-ubuntu-orange/30 scale-105",
                  isMobile
                    ? "p-2 rounded-xl hover:scale-105"
                    : "p-3 rounded-xl hover:scale-110"
                )}
                title={app.label}
              >
                <Icon
                  className={cn(
                    "transition-colors",
                    active ? "text-ubuntu-orange" : "text-foreground",
                    isMobile ? "w-6 h-6" : "w-8 h-8"
                  )}
                />

                {/* Tooltip - only show on desktop */}
                {!isMobile && (
                  <span className="absolute left-full ml-3 px-3 py-1.5 bg-ubuntu-dark border border-window-border rounded-lg text-sm whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
                    {app.label}
                  </span>
                )}

                {/* Active indicator */}
                {active && (
                  <div
                    className={cn(
                      "absolute bg-ubuntu-orange",
                      isMobile
                        ? "-bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-t-full"
                        : "-left-1 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full"
                    )}
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Dock
