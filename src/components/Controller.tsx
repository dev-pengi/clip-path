"use client";
import { FC, useEffect, useRef, useState, useContext } from "react";
import { Point, Shape, shapes } from "@/constants";
import { useShapeContext } from "@/contexts/ShapeContext";

const Controller: FC = ({}) => {
  const { setShape, shape } = useShapeContext();

  return (
    <div>
      <div className="bg-white shadow-light rounded-lg px-1 py-6 w-[98%] max-w-[400px] md:min-w-[400px]">
        <div className="grid grid-cols-3 gap-4 max-h-[330px] px-2 py-4 overflow-auto scr">
          {shapes.map((polshape: Shape, index: number) => {
            const points: Point[] = polshape.points;
            const clipPath = `${polshape.clip}(${points
              .map((point) => `${point.x}% ${point.y}%`)
              .join(", ")})`;
            return (
              <div
                key={index}
                className={`${
                  shape == index ? "bg-primary" : "bg-white"
                } cursor-pointer shadow-light hover:shadow-strong hover:-translate-y-1 duration-300 h-[100px] rounded-lg flex flex-col items-center justify-center gap-1`}
                onClick={() => setShape(index)}
              >
                <div
                  className={`duration-300 h-[40px] w-[40px] ${
                    shape == index ? "bg-white" : "bg-primary"
                  }`}
                  style={{ clipPath: clipPath }}
                />
                <p
                  className={`text-sm ${
                    shape == index ? "text-white" : "text-dark"
                  }`}
                >
                  {polshape.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Controller;
