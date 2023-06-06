"use client";
import { FC, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";

import { Point, Shape, shapes } from "@/constants";
import { useShapeContext } from "@/contexts/ShapeContext";
import { optionbuttonStyle } from "@/styles";

import copy from "/public/copy.svg";
import customize from "/public/customize.svg";
import done from "/public/done.svg";
import reset from "/public/delete.svg";

const Controller: FC = ({}) => {
  const {
    setShape,
    shape,
    cssCode,
    setPoints,
    points,
    isCustomizing,
    setIsCustomizing,
  } = useShapeContext();
  const handleCopy = () => {
    navigator.clipboard
      .writeText(cssCode)
      .then(() => {
        toast.success("Copied to clipboard");
      })
      .catch((error) => {
        toast.error("Could not copy text");
      });
  };
  const HandleCutomizeClick = () => {
    if (isCustomizing) {
      if (points.length < 3) return toast.error("Minimum 3 points required");
      setIsCustomizing(false);
    } else {
      setPoints([{ x: 0, y: 0 }]);
      setIsCustomizing(true);
      setShape(0);
    }
  };
  const handleReset = () => {
    setShape(1);
    setIsCustomizing(false);
  };

  useEffect(() => {
    if (isCustomizing && points.length >= 25) {
      setIsCustomizing(false);
      toast.error("Maximum 25 points allowed");
    }
  }, [points]);

  return (
    <div>
      <div className="bg-white shadow-light rounded-lg px-1 py-2 w-[98%] max-w-[400px] md:min-w-[400px]">
        <div className="grid grid-cols-3 gap-4 max-h-[330px] px-2 py-2 overflow-auto scr">
          {shapes.map((polshape: Shape, index: number) => {
            const points: Point[] = polshape.points;
            const clipPath = `${polshape.clip}(${points
              .map((point) => `${point.x}% ${point.y}%`)
              .join(", ")})`;
            return (
              <div
                key={index}
                className={`${
                  shape - 1 == index ? "bg-primary" : "bg-white"
                } cursor-pointer shadow-light hover:shadow-strong hover:-translate-y-1 duration-300 h-[100px] rounded-lg flex flex-col items-center justify-center gap-1`}
                onClick={() => setShape(index + 1)}
              >
                <div
                  className={`duration-300 h-[40px] w-[40px] ${
                    shape - 1 == index ? "bg-white" : "bg-primary"
                  }`}
                  style={{ clipPath: clipPath }}
                />
                <p
                  className={`text-sm ${
                    shape - 1 == index ? "text-white" : "text-dark"
                  }`}
                >
                  {polshape.name}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-center gap-9 mt-3 py-2">
          {isCustomizing ? (
            <button
              onClick={handleReset}
              className={`${optionbuttonStyle} bg-primary text-white`}
            >
              <Image src={reset} alt="reset" />
              <p>Reset</p>
            </button>
          ) : (
            <button onClick={handleCopy} className={`${optionbuttonStyle}`}>
              <Image src={copy} alt="copy" />
              <p>Css code</p>
            </button>
          )}
          <button
            onClick={HandleCutomizeClick}
            className={`${optionbuttonStyle} ${
              isCustomizing ? "bg-primary text-white" : "bg-white"
            } ${
              isCustomizing && points.length < 3
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {isCustomizing ? (
              <>
                <Image src={done} alt="done shape" />
                <p className="duration-100">Create</p>
              </>
            ) : (
              <>
                <Image src={customize} alt="done" />
                <p>Custom</p>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Controller;
