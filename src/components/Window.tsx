import { X, Minus, Maximize2 } from "lucide-react"
import { useState, useRef, useEffect, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface WindowProps {
  id: string
  title: string
  children: ReactNode
  onClose: () => void
  onMinimize: () => void
  onFocus: () => void
  minimized: boolean
  zIndex: number
}

const Window = ({
  id,
  title,
  children,
  onClose,
  onMinimize,
  onFocus,
  minimized,
  zIndex,
}: WindowProps) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [size, setSize] = useState(() => {
    const isMobileView = window.innerWidth < 768
    return {
      width: isMobileView ? window.innerWidth - 16 : 800,
      height: isMobileView ? window.innerHeight - 150 : 600,
    }
  })
  const [position, setPosition] = useState(() => {
    const isMobileView = window.innerWidth < 768
    if (isMobileView) {
      return { x: 8, y: 40 }
    }
    return {
      x: Math.max(0, (window.innerWidth - 800) / 2),
      y: Math.max(32, (window.innerHeight - 600) / 2),
    }
  })
  const [isDragging, setIsDragging] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [prevState, setPrevState] = useState({ position, size })
  const dragRef = useRef<{
    startX: number
    startY: number
    startPosX: number
    startPosY: number
  } | null>(null)

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)

      if (mobile && !isMaximized) {
        // On mobile, windows should be full screen
        setPosition({ x: 8, y: 40 })
        setSize({
          width: window.innerWidth - 16,
          height: window.innerHeight - 80,
        })
      } else if (!mobile && !isMaximized) {
        // On desktop, center the window if it was mobile
        const newWidth = 800
        const newHeight = 600
        setPosition({
          x: Math.max(0, (window.innerWidth - newWidth) / 2),
          y: Math.max(32, (window.innerHeight - newHeight) / 2),
        })
        setSize({ width: newWidth, height: newHeight })
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isMaximized])

  useEffect(() => {
    if (isDragging && !isMobile) {
      const handleMouseMove = (e: MouseEvent) => {
        if (dragRef.current) {
          const deltaX = e.clientX - dragRef.current.startX
          const deltaY = e.clientY - dragRef.current.startY
          setPosition({
            x: dragRef.current.startPosX + deltaX,
            y: Math.max(32, dragRef.current.startPosY + deltaY), // Keep below top bar
          })
        }
      }

      const handleTouchMove = (e: TouchEvent) => {
        if (dragRef.current && e.touches[0]) {
          const touch = e.touches[0]
          const deltaX = touch.clientX - dragRef.current.startX
          const deltaY = touch.clientY - dragRef.current.startY
          setPosition({
            x: dragRef.current.startPosX + deltaX,
            y: Math.max(32, dragRef.current.startPosY + deltaY),
          })
        }
      }

      const handleEnd = () => {
        setIsDragging(false)
        dragRef.current = null
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleEnd)
      document.addEventListener("touchmove", handleTouchMove)
      document.addEventListener("touchend", handleEnd)

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleEnd)
        document.removeEventListener("touchmove", handleTouchMove)
        document.removeEventListener("touchend", handleEnd)
      }
    }
  }, [isDragging, isMobile])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized || isMobile) return
    onFocus()
    setIsDragging(true)
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPosX: position.x,
      startPosY: position.y,
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isMaximized || isMobile) return
    onFocus()
    const touch = e.touches[0]
    setIsDragging(true)
    dragRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      startPosX: position.x,
      startPosY: position.y,
    }
  }

  const toggleMaximize = () => {
    if (isMobile) return // Don't allow maximize toggle on mobile

    if (isMaximized) {
      setPosition(prevState.position)
      setSize(prevState.size)
    } else {
      setPrevState({ position, size })
      setPosition({ x: 0, y: 32 })
      setSize({ width: window.innerWidth, height: window.innerHeight - 32 })
    }
    setIsMaximized(!isMaximized)
  }

  if (minimized) return null

  return (
    <div
      className={cn(
        "absolute bg-window-bg border border-window-border rounded-lg shadow-2xl overflow-hidden animate-slide-up",
        isDragging && "cursor-move",
        isMobile && "!rounded-lg mb-4"
      )}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex,
      }}
      onClick={onFocus}
    >
      {/* Window Header */}
      <div
        className={cn(
          "h-10 bg-window-header border-b border-window-border flex items-center justify-between px-3 select-none",
          !isMobile && "cursor-move"
        )}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
              className={cn(
                "rounded-full bg-destructive hover:bg-destructive/80 transition-colors flex items-center justify-center group",
                isMobile ? "w-6 h-6" : "w-4 h-4"
              )}
            >
              <X
                className={cn(
                  "opacity-0 group-hover:opacity-100 transition-opacity",
                  isMobile ? "w-3.5 h-3.5" : "w-2.5 h-2.5"
                )}
              />
            </button>
            {!isMobile && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onMinimize()
                  }}
                  className="w-4 h-4 rounded-full bg-muted hover:bg-muted/80 transition-colors flex items-center justify-center group"
                >
                  <Minus className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleMaximize()
                  }}
                  className="w-4 h-4 rounded-full bg-ubuntu-orange hover:bg-ubuntu-orange/80 transition-colors flex items-center justify-center group"
                >
                  <Maximize2 className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </>
            )}
          </div>
          <span
            className={cn(
              "font-ubuntu font-medium ml-2",
              isMobile ? "text-base" : "text-sm"
            )}
          >
            {title}
          </span>
        </div>
      </div>

      {/* Window Content */}
      <div className="h-[calc(100%-2.5rem)] overflow-auto">{children}</div>
    </div>
  )
}

export default Window
