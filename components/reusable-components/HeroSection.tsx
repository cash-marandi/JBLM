"use client";
import { TextGenerateEffect } from "../ui/Text-generate-effect";

export default function HeroSection({ title }: { title: string }) {
  return (
    <div className="py-20">
      <div className="text-center">
        <TextGenerateEffect words={title} />
      </div>
    </div>
  );
}
