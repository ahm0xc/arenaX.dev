"use client";

import React from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";

import { cn } from "~/lib/utils";

type ThemeSwitcherProps = {
  className?: string;
};

export default function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme();

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "rounded-full h-8 w-8 flex items-center justify-center bg-secondary/80 backdrop-blur-sm text-secondary-foreground/80 border border-border/50",
        className
      )}
    >
      {theme === "dark" ? (
        <MoonIcon className="h-4 w-4" />
      ) : (
        <SunIcon className="h-4 w-4" />
      )}
    </button>
  );
}
