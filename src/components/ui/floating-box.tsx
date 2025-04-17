"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "./button";
import { GripVertical, Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingBoxProps {
  children: React.ReactNode;
  title: string;
  defaultFloating?: boolean;
  className?: string;
  minWidth?: number;
  minHeight?: number;
  titleClassName?: string;
}

export function FloatingBox({
  children,
  title,
  defaultFloating = false,
  className,
  titleClassName,
  minWidth = 200,
  minHeight = 200,
}: FloatingBoxProps) {
  const [isFloating, setIsFloating] = useState(defaultFloating);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 400, height: 400 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [resizeDirection, setResizeDirection] = useState<
    "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw" | null
  >(null);
  const [hoverDirection, setHoverDirection] = useState<
    "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw" | null
  >(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverThreshold = 10; // pixels from edge to show handle

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isFloating) return;
    if ((e.target as HTMLElement).classList.contains("resize-handle")) return;

    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isFloating) return;

    if (isResizing && resizeDirection) {
      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;
      let newWidth = resizeStart.width;
      let newHeight = resizeStart.height;
      let newX = position.x;
      let newY = position.y;

      if (resizeDirection.includes("e")) {
        newWidth = Math.max(minWidth, resizeStart.width + deltaX);
      }
      if (resizeDirection.includes("w")) {
        newWidth = Math.max(minWidth, resizeStart.width - deltaX);
        newX = position.x + deltaX;
      }
      if (resizeDirection.includes("s")) {
        newHeight = Math.max(minHeight, resizeStart.height + deltaY);
      }
      if (resizeDirection.includes("n")) {
        newHeight = Math.max(minHeight, resizeStart.height - deltaY);
        newY = position.y + deltaY;
      }

      setSize({ width: newWidth, height: newHeight });
      setPosition({ x: newX, y: newY });
    } else if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    } else {
      // Handle hover detection
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const width = rect.width;
      const height = rect.height;

      let direction: typeof hoverDirection = null;

      // Check corners first
      if (x < hoverThreshold && y < hoverThreshold) direction = "nw";
      else if (x > width - hoverThreshold && y < hoverThreshold)
        direction = "ne";
      else if (x < hoverThreshold && y > height - hoverThreshold)
        direction = "sw";
      else if (x > width - hoverThreshold && y > height - hoverThreshold)
        direction = "se";
      // Then check edges
      else if (x < hoverThreshold) direction = "w";
      else if (x > width - hoverThreshold) direction = "e";
      else if (y < hoverThreshold) direction = "n";
      else if (y > height - hoverThreshold) direction = "s";

      setHoverDirection(direction);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeDirection(null);
  };

  const handleResizeStart = (
    e: React.MouseEvent,
    direction: "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw"
  ) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    });
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else if (isFloating) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing, isFloating]);

  const containerClasses = cn(
    "flex flex-col gap-2 bg-white p-4 rounded-lg border",
    {
      "fixed shadow-lg cursor-move z-50": isFloating,
      "w-full": !isFloating,
    },
    className
  );

  const resizeHandleClasses =
    "absolute bg-blue-500 rounded-full z-50 transition-opacity duration-200";
  const resizeHandleSize = 8;

  const getCursorStyle = () => {
    if (!isFloating) return "";
    if (isDragging) return "cursor-move";
    if (isResizing) return `cursor-${resizeDirection}-resize`;
    if (hoverDirection) return `cursor-${hoverDirection}-resize`;
    return "cursor-move";
  };

  return (
    <div
      ref={containerRef}
      className={cn(containerClasses, getCursorStyle())}
      style={
        isFloating
          ? {
              left: `${position.x}px`,
              top: `${position.y}px`,
              width: `${size.width}px`,
              height: `${size.height}px`,
              transform: isDragging ? "scale(1.02)" : "scale(1)",
              transition:
                isDragging || isResizing ? "none" : "transform 0.2s ease",
            }
          : undefined
      }
      onMouseDown={handleMouseDown}
    >
      <div className="flex items-center justify-between">
        <h2 className={cn("text-lg font-bold", titleClassName)}>{title}</h2>
        <div className="flex items-center gap-2">
          {isFloating && <GripVertical className="h-4 w-4 text-gray-400" />}
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={() => setIsFloating(!isFloating)}
            className="h-6 w-6"
          >
            {isFloating ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-auto">{children}</div>

      {isFloating && (
        <>
          {/* North */}
          <div
            className={cn(
              resizeHandleClasses,
              "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
              {
                "opacity-100": hoverDirection === "n",
                "opacity-0": hoverDirection !== "n",
              }
            )}
            style={{ width: resizeHandleSize, height: resizeHandleSize }}
            onMouseDown={(e) => handleResizeStart(e, "n")}
          />
          {/* South */}
          <div
            className={cn(
              resizeHandleClasses,
              "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
              {
                "opacity-100": hoverDirection === "s",
                "opacity-0": hoverDirection !== "s",
              }
            )}
            style={{ width: resizeHandleSize, height: resizeHandleSize }}
            onMouseDown={(e) => handleResizeStart(e, "s")}
          />
          {/* East */}
          <div
            className={cn(
              resizeHandleClasses,
              "right-0 top-1/2 translate-x-1/2 -translate-y-1/2",
              {
                "opacity-100": hoverDirection === "e",
                "opacity-0": hoverDirection !== "e",
              }
            )}
            style={{ width: resizeHandleSize, height: resizeHandleSize }}
            onMouseDown={(e) => handleResizeStart(e, "e")}
          />
          {/* West */}
          <div
            className={cn(
              resizeHandleClasses,
              "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
              {
                "opacity-100": hoverDirection === "w",
                "opacity-0": hoverDirection !== "w",
              }
            )}
            style={{ width: resizeHandleSize, height: resizeHandleSize }}
            onMouseDown={(e) => handleResizeStart(e, "w")}
          />
          {/* North East */}
          <div
            className={cn(
              resizeHandleClasses,
              "top-0 right-0 translate-x-1/2 -translate-y-1/2",
              {
                "opacity-100": hoverDirection === "ne",
                "opacity-0": hoverDirection !== "ne",
              }
            )}
            style={{ width: resizeHandleSize, height: resizeHandleSize }}
            onMouseDown={(e) => handleResizeStart(e, "ne")}
          />
          {/* North West */}
          <div
            className={cn(
              resizeHandleClasses,
              "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
              {
                "opacity-100": hoverDirection === "nw",
                "opacity-0": hoverDirection !== "nw",
              }
            )}
            style={{ width: resizeHandleSize, height: resizeHandleSize }}
            onMouseDown={(e) => handleResizeStart(e, "nw")}
          />
          {/* South East */}
          <div
            className={cn(
              resizeHandleClasses,
              "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
              {
                "opacity-100": hoverDirection === "se",
                "opacity-0": hoverDirection !== "se",
              }
            )}
            style={{ width: resizeHandleSize, height: resizeHandleSize }}
            onMouseDown={(e) => handleResizeStart(e, "se")}
          />
          {/* South West */}
          <div
            className={cn(
              resizeHandleClasses,
              "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
              {
                "opacity-100": hoverDirection === "sw",
                "opacity-0": hoverDirection !== "sw",
              }
            )}
            style={{ width: resizeHandleSize, height: resizeHandleSize }}
            onMouseDown={(e) => handleResizeStart(e, "sw")}
          />
        </>
      )}
    </div>
  );
}
