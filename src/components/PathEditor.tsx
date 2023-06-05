"use client";
import { FC, useEffect, useRef, useState } from "react";
import HandlerDot from "./HandlerDot";

interface Point {
  x: number;
  y: number;
}

const PolygonEditor: FC = () => {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [height, setHeight] = useState(300);
  const [width, setWidth] = useState(300);

  const [points, setPoints] = useState<Point[]>([
    { x: 0, y: height },
    { x: width, y: height },
    { x: width, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);
  const [clipPath, setClipPath] = useState<string>("");

  //   useEffect(() => {
  //     document.getElementsByTagName("body")[0].style.cursor = isDragging
  //       ? "none !important"
  //       : "none";
  //   }, [isDragging]);

  useEffect(() => {
    setClipPath(
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

  return (
    <div
      className={`relative w-[300px] h-[300px]`}
    >
      <div className="shadowboard opacity-25 absolute bg-city w-full h-full" />
      <div
        className={`clipped-image bg-city w-full h-full overflow-visible ${
          isDragging ? "cursor-none" : ""
        }`}
        style={{ clipPath: clipPath }}
        ref={containerRef}
      />
      {points.map((point, index) => (
        <HandlerDot
          key={index}
          x={point.x}
          y={point.y}
          onDrag={(newPosition: Point) => handleDotDrag(index, newPosition)}
          IsDragging={isDragging}
          setIsDragging={setIsDragging}
        />
      ))}
    </div>
  );
};

export default PolygonEditor;
