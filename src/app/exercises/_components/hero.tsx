import React from "react";
import ThemeSwitcher from "./theme-switcher";

export default function Hero() {
  return (
    <div>
      <ThemeSwitcher className="absolute top-4 right-4 z-10" />
      <section className="flex flex-col items-center justify-center h-[60vh]">
        <h1 className="text-6xl font-bold text-center relative">
          <img
            src="/images/dumbell.png"
            className="absolute -top-12 -left-12 -rotate-[30deg] right-0 saturate-0 dark:brightness-150 "
            alt=""
          />
          Exercises improves <br /> your{" "}
          <span className="relative text-foreground/80">
            <div
              aria-label="line-through"
              className="absolute top-1/2 inset-x-0 -translate-y-[50%] h-[5px] w-full bg-purple-700 dark:bg-purple-500 blur-[2px]"
            />
            <span className="absolute top-[120%] rotate-[10deg] bg-purple-500 dark:bg-purple-600 text-white rounded-lg px-2 py-1">
              Skill
            </span>
            health
          </span>
        </h1>
      </section>
    </div>
  );
}
