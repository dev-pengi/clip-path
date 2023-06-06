"use client";
import { Header, ClipCreator } from "@/components";
import ShapeProvider from "@/contexts/ShapeContext";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <ShapeProvider>
      <Toaster />
      <Header />
      <main>
        <ClipCreator />
      </main>
    </ShapeProvider>
  );
}
