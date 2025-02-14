"use client";

import React from "react";
import {
  ChartNoAxesColumnIcon,
  SettingsIcon,
  TerminalIcon,
} from "lucide-react";
import Link from "next/link";
import { create } from "zustand";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";
import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { Markdown } from "~/components/markdown";
import { Badge } from "~/components/ui/badge";
import type { Exercise } from "~/types";
import PythonEditor from "../../_components/python-editor";

interface ExerciseStore {
  result: { output: string | null; error: string | null };
  setResult: (result: { output: string | null; error: string | null }) => void;
}

export const useExerciseStore = create<ExerciseStore>((set) => ({
  result: { output: null, error: null },
  setResult: (result) => set({ result }),
}));

interface EditorProps {
  exercise: Exercise;
}

export default function Editor({ exercise }: EditorProps) {
  if (exercise.category === "python") {
    return (
      <Shell exercise={exercise}>
        <PythonEditor
          initialCode={exercise.initialCode}
          validations={exercise.validations}
        />
      </Shell>
    );
  }

  return null;
}

function Shell({
  exercise,
  children,
}: {
  exercise: Exercise;
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen">
      <Header />
      <div className="h-[calc(100vh-4rem)]">
        <ResizablePanelGroup direction="horizontal" className="rounded-lg">
          <ResizablePanel defaultSize={40} minSize={25}>
            <DocumentArea exercise={exercise} />
          </ResizablePanel>
          <ResizableHandle className="bg-transparent" withHandle />
          <ResizablePanel defaultSize={60} minSize={25}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={70}>{children}</ResizablePanel>
              <ResizablePanel defaultSize={30} minSize={30} maxSize={30}>
                <OutputArea />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="h-16 px-4 md:px-8 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Link href="/exercises">
            <Icons.logo className="h-5 w-5" />
          </Link>
          <span className="text-lg text-muted-foreground/50">/</span>
          <span className="text-lg font-medium">Exercises</span>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Button variant="secondary" className="rounded-r-none gap-2" size="sm">
          <ChartNoAxesColumnIcon className="w-4 h-4" />
          Leaderboard
        </Button>
        <Button variant="secondary" className="rounded-l-none gap-2" size="sm">
          <SettingsIcon className="w-4 h-4" />
          Settings
        </Button>
      </div>
      <div className="flex items-center gap-2 bg-secondary rounded-full p-1 pr-3">
        <img
          src="https://github.com/shadcn.png"
          className="w-7 h-7 rounded-full"
        />
        <div className="flex flex-col">
          <span className="text-[12px] font-medium text-secondary-foreground">
            Ahmed
          </span>
          <span className="text-[10px] text-secondary-foreground/80">
            @ahm0xc
          </span>
        </div>
      </div>
    </div>
  );
}

function DocumentArea({ exercise }: { exercise: Exercise }) {
  return (
    <div className="flex h-full flex-col p-2">
      <div className="bg-secondary/80 rounded-t-xl border-b min-h-10 h-10"></div>
      <div className="flex-1 bg-[#0c0c0c] overflow-y-scroll p-4">
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-2xl font-bold">11. Two Sum</h1>
          <div>
            <Badge variant="default">Easy</Badge>
          </div>
        </div>
        <Markdown>{exercise.description}</Markdown>
      </div>
      <div className="bg-secondary/80 rounded-b-xl border-t min-h-10 h-10"></div>
    </div>
  );
}

function OutputArea() {
  const { result } = useExerciseStore();
  return (
    <div className="flex h-full flex-col p-2">
      <div className="bg-secondary/80 rounded-t-xl border-b min-h-10 h-10">
        <div className="h-full flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-4 h-4" />
            <span className="text-sm font-medium">output</span>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-[#0c0c0c] overflow-y-scroll p-4">
        {result.output && (
          <div className="text-sm text-foreground whitespace-pre-wrap">
            {result.output}
          </div>
        )}
        {result.error && (
          <div className="text-sm text-red-500 whitespace-pre-wrap">
            {result.error}
          </div>
        )}
      </div>
      <div className="bg-secondary/80 rounded-b-xl border-t min-h-10 h-10"></div>
    </div>
  );
}
