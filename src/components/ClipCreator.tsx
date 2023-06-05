"use client";
import { useEffect, useRef, useState } from "react";
import { FC } from "react";
import Editor from "./PathEditor";
import { contentPadding } from "@/styles";

const ClipCreator: FC = () => {
  return (
    <section>
      <h1 className="capitalize text-center text-3xl font-black">
        create and customize your css clip path
      </h1>
      <div
        className={`${contentPadding} w-full max-w-[1100px] mx-auto mt-16 flex md:flex-row flex-col-reverse md:gap-1 gap-7 items-center justify-between`}
      >
        <div className="h-max w-max">
          <Editor />
        </div>
      </div>
    </section>
  );
};

export default ClipCreator;
