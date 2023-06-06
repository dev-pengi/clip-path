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

  const { shape, width, height, points, cssCode, setPoints, setCssCode } =
    useShapeContext();

  useEffect(() => {
    const newPoints = shapes[shape].points.map((point) => {
      return { x: (point.x * width) / 100, y: (point.y * height) / 100 };
    });
    setPoints(newPoints);
  }, [shape]);

  useEffect(() => {
    setCssCode(
      `${shapes[shape].clip}(${points
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

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`relative w-[300px] h-[300px]`}>
        <div className="shadowboard opacity-25 absolute bg-city w-full h-full" />
        <div
          className={`clipped-image bg-city w-full h-full overflow-visible`}
          style={{ clipPath: cssCode }}
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
