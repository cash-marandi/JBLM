"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[20rem] rounded-md flex flex-col antialiased bg-white dark:bg-background dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "Bulk water and outfall Sewer Reticulation system (Town Prencict) for the Chikomba Rural District Council in Chivu – Zimbabwe",
    name: "Water and Sewerage Project",
    title: "District Council in Chivu – Zimbabwe",
  },
  {
    quote:
      "Water and Sanitation Reticulation for new Stands in Borrowadale Heights for the Ministry of Local Government, local Housing – Borrowadale Heights",
    name: "Water and Sanitation Reticulation",
    title: "Ministry of Local Government, local Housing – Borrowadale Heights",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];
