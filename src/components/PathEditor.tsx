"use client";
import { FC, useEffect, useRef, useState } from "react";
import HandlerDot from "./HandlerDot";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useShapeContext } from "@/contexts/ShapeContext";
import { shapes } from "@/constants";

interface Point {
  x: number;
  y: number;
}

const PolygonEditor: FC = () => {
  const containerRef = useRef(null);
  const [clickPosition, setClickPosition] = useState<Point | null>(null);

  const {
    shape,
    width,
    height,
    points,
    cssCode,
    setPoints,
    setCssCode,
    isCustomizing,
  } = useShapeContext();

  useEffect(() => {
    if (shape == 0) return;
    const newPoints = shapes[shape - 1].points.map((point) => {
      return { x: (point.x * width) / 100, y: (point.y * height) / 100 };
    });
    setPoints(newPoints);
  }, [shape]);

  useEffect(() => {
    setCssCode(
      `polygon(${points
        .map(
          (point) =>
            `${Math.floor((point.x / width) * 100)}% ${Math.floor(
              (point.y / height) * 100
            )}%`
        )
        .join(", ")})`
    );
  }, [points]);

  const handleDotDrag = (index: number, newPosition: Point) => {
    const updatedPoints = [...points];
    updatedPoints[index] = newPosition;
    setPoints(updatedPoints);
  };

  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isCustomizing) return;
    const container = containerRef.current;
    if (container) {
      const containerRect = (container as Element).getBoundingClientRect();
      const offsetX = event.clientX - containerRect.left;
      const offsetY = event.clientY - containerRect.top;
      const newPosition: Point = {
        x: offsetX,
        y: offsetY,
      };
      setClickPosition(newPosition);
    }
  };

  useEffect(() => {
    if (clickPosition) {
      const updatedPoints = [...points, clickPosition];
      setPoints(updatedPoints);
      setClickPosition(null);
    }
  }, [clickPosition]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className={`relative w-[300px] h-[300px] ${
          isCustomizing ? "cursor-crosshair" : "cursor-auto"
        }`}
        onClick={handleContainerClick}
      >
        <div className="shadowboard opacity-25 absolute bg-city w-full h-full" />
        <div
          className={`clipped-image bg-city w-full h-full overflow-visible`}
          style={{ clipPath: points.length ? cssCode : "none" }}
          ref={containerRef}
        />
        {points.map((point, index) => (
          <HandlerDot
            key={index}
            x={point.x}
            y={point.y}
            onDrag={(newPosition: Point) => handleDotDrag(index, newPosition)}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default PolygonEditor;
