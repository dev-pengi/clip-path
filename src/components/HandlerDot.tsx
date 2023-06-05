"use client";
import React, { useState, useEffect, useRef } from "react";

interface HandlerDotProps {
  x: number;
  y: number;
  onDrag: (newPosition: { x: number; y: number }) => void;
}

const HandlerDot: React.FC<HandlerDotProps> = ({ x, y, onDrag }) => {
  const [isDragging, setIsDragging] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging && dotRef.current) {
      const parentRect = (
        dotRef.current.parentNode as Element
      )?.getBoundingClientRect();
      if (!parentRect) return;

      const newX = clamp(event.clientX - parentRect.left, 0, parentRect.width);
      const newY = clamp(event.clientY - parentRect.top, 0, parentRect.height);

      onDrag({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={dotRef}
      className={`handler-dot z-[100] ${
        isDragging
          ? "bg-transparent border-[2px] border-primary border-solid cursor-none"
          : "bg-primary cursor-grab"
      } opacity-70 rounded-full w-5 h-5 absolute transform -translate-x-2 -translate-y-2`}
      style={{ left: `${x}px`, top: `${y}px` }}
      onMouseDown={handleMouseDown}
      draggable={true}
      onDragStart={(e) => e.preventDefault()}
    />
  );
};

export default HandlerDot;

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}
