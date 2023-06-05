"use client";
import { FC, useEffect, useRef, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import threeangeles from "../../public/3angle.svg";
import angeles from "../../public/angles.svg";
import circle from "../../public/circle.svg";
import circleEnd from "../../public/circle-end.svg";
import download from "../../public/download.svg";
import copy from "../../public/copy.svg";
import Image from "next/image";
import { saveSvgAsPng } from "save-svg-as-png";
import { ChromePicker } from "react-color";
import { colorbuttonStyle, optionbuttonStyle } from "@/styles";
import { toast } from "react-hot-toast";

interface Props {
  handleAngleChange: (value: number | number[]) => void;
  handleCircleChange: (value: number | number[]) => void;
  svgRef: any;
  color1: any;
  color2: any;
  setColor1: any;
  setColor2: any;
  outline: any;
  setOutline: any;
}

const Controller: FC<Props> = ({
  handleAngleChange,
  handleCircleChange,
  svgRef,
  color1,
  color2,
  setColor1,
  setColor2,
  outline,
  setOutline,
}) => {
  const [chrome1Enabled, setChrome1Enabled] = useState(false);
  const [chrome2Enabled, setChrome2Enabled] = useState(false);

  const color1Ref: any = useRef(null);
  const color2Ref: any = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (color1Ref.current && !color1Ref.current.contains(event.target)) {
        setChrome1Enabled(false);
      }
      if (color2Ref.current && !color2Ref.current.contains(event.target)) {
        setChrome2Enabled(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePNGDownload = () => {
    saveSvgAsPng(svgRef.current, "blob.png");
  };
  const handleSVGDownload = () => {
    const svgElement = svgRef.current;

    if (svgElement) {
      const svgData = new XMLSerializer().serializeToString(svgElement);

      const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "image.svg";
      link.click();

      URL.revokeObjectURL(url);
    }
  };
  const handleCopyCode = () => {
    const svgElement = svgRef.current;

    if (svgElement) {
      const svgData = new XMLSerializer().serializeToString(svgElement);
      navigator.clipboard
        .writeText(svgData)
        .then(() => {
          toast.success("SVG code copied to clipboard");
        })
        .catch((error) => {
          toast.error("Error copying SVG code");
        });
    } else toast.error("Error copying SVG code");
  };

  return (
    <div>
      <div className="bg-white shadow-light rounded-lg px-7 py-6 w-[98%] max-w-[400px] md:min-w-[400px]">
        <div className="flex items-center justify-center gap-12 px-8">
          <div ref={color1Ref} className="relative">
            <button
              className={`${colorbuttonStyle}`}
              style={{ backgroundColor: color1 }}
              onClick={() => setChrome1Enabled(!chrome1Enabled)}
            ></button>
            {chrome1Enabled && (
              <ChromePicker
                className="absolute left-0 z-10"
                disableAlpha
                color={color1}
                onChange={(newColor) => setColor1(newColor.hex)}
              />
            )}
          </div>
          <div ref={color2Ref} className="relative">
            <button
              className={`${colorbuttonStyle}`}
              style={{ backgroundColor: color2 }}
              onClick={() => setChrome2Enabled(!chrome2Enabled)}
            ></button>
            {chrome2Enabled && (
              <ChromePicker
                className="absolute left-0 z-10"
                disableAlpha
                color={color2}
                onChange={(newColor) => setColor2(newColor.hex)}
              />
            )}
          </div>
          <div>
            <button
              className={`${colorbuttonStyle} ${
                outline ? "bg-gray-500" : "border-gray-500 border-solid"
              }`}
              onClick={() => setOutline(!outline)}
            ></button>
          </div>
        </div>

        <div className="flex flex-col gap-6 mt-4">
          <div className="flex items-center justify-center gap-3">
            <Image src={threeangeles} alt="threeangeles" />
            <Slider
              step={1}
              defaultValue={4}
              min={3}
              max={50}
              handleStyle={{
                background: "#7f7f7f",
                opacity: "1",
                border: "none",
              }}
              trackStyle={{ backgroundColor: "#9f9f9f" }}
              onChange={handleAngleChange}
            />
            <Image src={angeles} alt="angeles" />
          </div>
          <div className="flex items-center justify-center gap-3">
            <Image src={circleEnd} alt="circleEnd" />
            <Slider
              step={1}
              defaultValue={10}
              min={1}
              max={10}
              handleStyle={{
                background: "#7f7f7f",
                opacity: "1",
                border: "none",
              }}
              trackStyle={{ backgroundColor: "#9f9f9f" }}
              onChange={handleCircleChange}
            />
            <Image src={circle} alt="circle" />
          </div>
        </div>

        <div className="flex items-center justify-center gap-9 mt-5">
          <button
            onClick={handleSVGDownload}
            className={`${optionbuttonStyle}`}
          >
            <Image src={download} alt="download" />
            Svg
          </button>
          <button
            onClick={handlePNGDownload}
            className={`${optionbuttonStyle}`}
          >
            <Image src={download} alt="download" />
            Png
          </button>
          <button onClick={handleCopyCode} className={`${optionbuttonStyle}`}>
            <Image src={copy} alt="copy" />
            Svg
          </button>
        </div>
      </div>
    </div>
  );
};

export default Controller;
