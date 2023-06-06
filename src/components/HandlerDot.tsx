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

  const handleDragStart = (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragMove = (event: any) => {
    if (isDragging && dotRef.current) {
      const parentRect = (
        dotRef.current.parentNode as Element
      )?.getBoundingClientRect();
      if (!parentRect) return;

      const clientX =
        "touches" in event ? event.touches[0].clientX : event.clientX;
      const clientY =
        "touches" in event ? event.touches[0].clientY : event.clientY;

      const newX = clamp(clientX - parentRect.left, 0, parentRect.width);
      const newY = clamp(clientY - parentRect.top, 0, parentRect.height);

      onDrag({ x: newX, y: newY });
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleDragMove);
      window.addEventListener("touchmove", handleDragMove, { passive: false });
      window.addEventListener("mouseup", handleDragEnd);
      window.addEventListener("touchend", handleDragEnd);
    } else {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("touchmove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchend", handleDragEnd);
    }
    document.body.style.overflowY = isDragging ? "hidden" : "auto";
    return () => {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("touchmove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchend", handleDragEnd);
      document.body.style.overflowY = "auto";
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
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
      draggable={false}
    />
  );
};

export default HandlerDot;

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}
