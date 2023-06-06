"use client";
import { useShapeContext } from "@/contexts/ShapeContext";
import React, { useState, useEffect, useRef } from "react";

interface HandlerDotProps {
  x: number;
  y: number;
  onDrag: (newPosition: { x: number; y: number }) => void;
}

const HandlerDot: React.FC<HandlerDotProps> = ({ x, y, onDrag }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isTouchDrag, setIsTouchDrag] = useState(false);
  const { isCustomizing } = useShapeContext();
  const dotRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (!isCustomizing) {
      event.preventDefault();
      setIsDragging(true);
      setIsTouchDrag("touches" in event);
    }
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
      setIsTouchDrag(false);
    }
    return () => {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("touchmove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [isDragging]);

  useEffect(() => {
    document.body.style.overflowY = isTouchDrag ? "hidden" : "auto";
  }, [isTouchDrag]);

  return (
    <div
      ref={dotRef}
      className={`handler-dot z-[100] ${
        isDragging
          ? "bg-transparent border-[2px] border-primary border-solid cursor-none"
          : `bg-primary ${isCustomizing ? "" : "cursor-grab"}`
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
