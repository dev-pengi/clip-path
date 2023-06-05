"use client";
import { FC } from "react";
import Image from "next/image";
import logo from "../../public/logo.png";
import { contentPadding } from "@/styles";

const Header: FC = () => {
  return (
    <header className="w-full foxed top-0 h-20 flex">
      <div
        className={`${contentPadding} w-full h-full flex items-center justify-between`}
      >
        <div className="flex gap-1 items-center">
          <Image src={logo} alt="logo" className="w-10" />
          <h2 className="font-black text-2xl font-[cursive]">clip-path editor</h2>
        </div>
        <div>
          <a
            href="https://sifedine.com/#projects"
            className="font-medium text-lg font-[cursive] hover:underline"
          >
            more projects?
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
