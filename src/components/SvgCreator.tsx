"use client";
import { useEffect, useRef, useState } from "react";
import { FC } from "react";
import Controller from "./Controller";
import { SvgBlob } from "react-svg-blob";
import { contentPadding } from "@/styles";

const SvgCreator: FC = () => {
  const [angels, setAngels] = useState(3);
  const [circle, setCircle] = useState(9);

  const [color1, setColor1] = useState("#1FFBE8");
  const [color2, setColor2] = useState("#34FF80");

  const [outline, setOutline] = useState(false);
  const svgRef = useRef(null);

  return (
    <section>
      <h1 className="capitalize text-center text-3xl font-black">
        create beautiful svg blob shapes
      </h1>
      <div
        className={`${contentPadding} w-full max-w-[1100px] mx-auto mt-16 flex md:flex-row flex-col-reverse md:gap-1 gap-7 items-center justify-between`}
      >
        <div className="w-[97%] max-w-[400px]">
          <SvgBlob
            ref={svgRef}
            className="overflow-visible"
            shapeProps={{ growth: circle, edges: angels }}
            variant="gradient"
            colors={[color1, color2]}
            isOutline={outline}
          />
        </div>
        <Controller
          handleAngleChange={(value) => setAngels(value as number)}
          handleCircleChange={(value) => setCircle(value as number)}
          svgRef={svgRef}
          color1={color1}
          color2={color2}
          setColor1={setColor1}
          setColor2={setColor2}
          outline={outline}
          setOutline={setOutline}
        />
      </div>
    </section>
  );
};

export default SvgCreator;
