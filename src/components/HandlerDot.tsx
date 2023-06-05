"use client";
import React, { DragEvent, useState, useEffect } from "react";

interface HandlerDotProps {
  x: number;
  y: number;
  onDrag: (newPosition: { x: number; y: number }) => void;
  IsDragging: boolean;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
}

const HandlerDot: React.FC<HandlerDotProps> = ({
  x,
  y,
  onDrag,
  IsDragging,
  setIsDragging,
}) => {
  const [dragging, setDragging] = useState(false);
  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer!.setDragImage(new Image(), 0, 0);
    setIsDragging(true);
    setDragging(true);
    event.dataTransfer!.effectAllowed = "all";
  };
  useEffect(() => {
    document.addEventListener("dragover", (event) => {
      event.preventDefault();
    });
  }, []);

  const handleDragEnd = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(false);
    setDragging(false);

    const parentRect = (
      event.currentTarget.parentNode as Element
    )?.getBoundingClientRect();
    if (!parentRect) return;

    const newX = clamp(event.clientX - parentRect.left, 0, parentRect.width);
    const newY = clamp(event.clientY - parentRect.top, 0, parentRect.height);

    onDrag({ x: newX, y: newY });
  };
  const handleDrag = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const parentRect = (
      event.currentTarget.parentNode as Element
    )?.getBoundingClientRect();
    if (!parentRect) return;

    const newX = clamp(event.clientX - parentRect.left, 0, parentRect.width);
    const newY = clamp(event.clientY - parentRect.top, 0, parentRect.height);

    onDrag({ x: newX, y: newY });
  };

  return (
    <div
      className={`handler-dot ${
        dragging
          ? "bg-transparent border-[2px] border-primary border-solid cursor-none"
          : "bg-primary"
      } opacity-70 rounded-full w-4 h-4 absolute transform -translate-x-2 -translate-y-2 cursor-grabbing`}
      style={{ left: `${x}px`, top: `${y}px` }}
      // draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDrag={handleDrag}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      }}
      onDragEnter={(e) => {
        e.preventDefault();
      }}
    />
  );
};

export default HandlerDot;

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}
