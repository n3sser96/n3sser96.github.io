import { Clock } from "lucide-react"
import { useState, useEffect } from "react"

interface TopBarProps {
  windows: Array<{ id: string; title: string; minimized: boolean }>
  onWindowClick: (id: string) => void
}

const TopBar = ({ windows, onWindowClick }: TopBarProps) => {
  const [time, setTime] = useState(new Date())
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="h-8 bg-ubuntu-dark border-b border-window-border flex items-center justify-between px-3 text-sm select-none">
      <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
        <span className="font-ubuntu font-bold text-ubuntu-orange truncate">
          {isMobile ? "N. Al Subhi" : "Nasser Al Subhi"}
        </span>
        {!isMobile && (
          <span className="text-muted-foreground hidden sm:block">
            Software Development Manager
          </span>
        )}
      </div>

      {!isMobile && (
        <div className="flex items-center gap-2 overflow-x-auto max-w-md">
          {windows
            .filter((w) => !w.minimized)
            .map((window) => (
              <button
                key={window.id}
                onClick={() => onWindowClick(window.id)}
                className="px-3 py-0.5 rounded bg-window-bg hover:bg-muted transition-colors text-xs whitespace-nowrap"
              >
                {window.title}
              </button>
            ))}
        </div>
      )}

      <div className="flex items-center gap-2 text-muted-foreground">
        <Clock className="w-3 h-3" />
        <span className="font-ubuntu text-xs md:text-sm">
          {time.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  )
}

export default TopBar
