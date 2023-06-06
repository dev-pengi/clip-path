"use client";
import { FC } from "react";
import Editor from "./PathEditor";
import { contentPadding } from "@/styles";
import Controller from "./Controller";
import { useShapeContext } from "@/contexts/ShapeContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const ClipCreator: FC = () => {
  const { cssCode } = useShapeContext();
  return (
    <section>
      <h1 className="capitalize text-center text-3xl font-black">
        create and customize your css clip path
      </h1>
      <div
        className={`${contentPadding} w-full max-w-[1100px] mx-auto mt-12 flex md:flex-row flex-col-reverse md:gap-1 gap-7 items-center justify-between`}
      >
        <div className="h-max w-max">
          <Editor />
        </div>
        <Controller />
      </div>
      <div className="w-max md:max-w-[750px] max-w-[98vw] mx-auto mt-12">
        <div className="px-6 py-4">
          <SyntaxHighlighter
            language="css"
            style={oneDark}
            customStyle={{ wordBreak: "break-word", borderRadius: "7px" }}
            wrapLongLines
          >
            {`clip-path: ${cssCode};`}
          </SyntaxHighlighter>
        </div>
      </div>
    </section>
  );
};

export default ClipCreator;
