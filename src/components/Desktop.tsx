import { useState, useEffect } from "react"
import TopBar from "./TopBar"
import Dock from "./Dock"
import Window from "./Window"
import AboutWindow from "./windows/AboutWindow"
import ExperienceWindow from "./windows/ExperienceWindow"
import EducationWindow from "./windows/EducationWindow"
import SkillsWindow from "./windows/SkillsWindow"
import ProjectsWindow from "./windows/ProjectsWindow"
import TerminalWindow from "./windows/TerminalWindow"

export type WindowType =
  | "about"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "terminal"

interface OpenWindow {
  id: string
  type: WindowType
  title: string
  minimized: boolean
  zIndex: number
}

const Desktop = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [windows, setWindows] = useState<OpenWindow[]>([
    {
      id: `about-${Date.now()}`,
      type: "about",
      title: "About Me",
      minimized: false,
      zIndex: 10,
    },
  ])
  const [nextZIndex, setNextZIndex] = useState(11)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const openWindow = (type: WindowType) => {
    const titles: Record<WindowType, string> = {
      about: "About Me",
      experience: "Experience",
      education: "Education",
      skills: "Skills",
      projects: "Projects",
      terminal: "Terminal",
    }

    // Check if window is already open
    const existing = windows.find((w) => w.type === type)
    if (existing) {
      if (isMobile) {
        // On mobile, just show the existing window
        setWindows([{ ...existing, minimized: false, zIndex: nextZIndex }])
      } else {
        // On desktop, close all other windows and show this one
        setWindows([{ ...existing, minimized: false, zIndex: nextZIndex }])
      }
      setNextZIndex((prev) => prev + 1)
      return
    }

    // Create new window
    const newWindow: OpenWindow = {
      id: `${type}-${Date.now()}`,
      type,
      title: titles[type],
      minimized: false,
      zIndex: nextZIndex,
    }

    if (isMobile) {
      // On mobile, only show one window at a time
      setWindows([newWindow])
    } else {
      // On desktop, close all windows and open the new one
      setWindows([newWindow])
    }
    setNextZIndex((prev) => prev + 1)
  }

  const closeWindow = (id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id))
  }

  const minimizeWindow = (id: string) => {
    if (isMobile) {
      // On mobile, minimize means close
      closeWindow(id)
    } else {
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, minimized: true } : w))
      )
    }
  }

  const bringToFront = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: nextZIndex } : w))
    )
    setNextZIndex((prev) => prev + 1)
  }

  const renderWindowContent = (type: WindowType) => {
    switch (type) {
      case "about":
        return <AboutWindow />
      case "experience":
        return <ExperienceWindow />
      case "education":
        return <EducationWindow />
      case "skills":
        return <SkillsWindow />
      case "projects":
        return <ProjectsWindow />
      case "terminal":
        return <TerminalWindow />
      default:
        return null
    }
  }

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-gradient-to-br from-ubuntu-aubergine via-ubuntu-dark to-ubuntu-purple touch-manipulation">
      <TopBar windows={windows} onWindowClick={bringToFront} />

      <div className={`flex-1 relative ${isMobile ? "pb-20" : ""}`}>
        {windows.map((window) => (
          <Window
            key={window.id}
            id={window.id}
            title={window.title}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            onFocus={() => bringToFront(window.id)}
            minimized={window.minimized}
            zIndex={window.zIndex}
          >
            {renderWindowContent(window.type)}
          </Window>
        ))}
      </div>

      <Dock onOpenWindow={openWindow} activeWindows={windows} />
    </div>
  )
}

export default Desktop
