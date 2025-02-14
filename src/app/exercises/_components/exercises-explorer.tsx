"use client";

import React from "react";
import { LockIcon, SwordsIcon } from "lucide-react";
import { motion } from "motion/react";

import { Icons } from "~/components/icons";
import { cn } from "~/lib/utils";
import ExercisesList from "./exercises-list";
import {
  allExercises,
  pythonExercises,
  javascriptExercises,
} from "~/../exercises";
import { Exercise } from "~/types";

interface Tab {
  id: string;
  label: string;
  exercises: Exercise[];
  icon?: React.ElementType;
  locked?: boolean;
}

const tabs: Tab[] = [
  {
    id: "all",
    label: "All",
    icon: SwordsIcon,
    exercises: allExercises,
  },
  {
    id: "python",
    label: "Python",
    icon: Icons.Python,
    exercises: pythonExercises,
  },
  {
    id: "javascript",
    label: "JavaScript",
    icon: Icons.JavaScript,
    exercises: javascriptExercises,
  },
  {
    id: "typescript",
    label: "TypeScript",
    locked: true,
    exercises: [],
  },
  {
    id: "rust",
    label: "Rust",
    locked: true,
    exercises: [],
  },
];

export default function ExercisesExplorer() {
  const [currentTab, setCurrentTab] = React.useState<Tab | null>(tabs[0]);

  return (
    <div>
      <ExercisesHeader
        tabs={tabs}
        currentTab={currentTab}
        onTabChange={setCurrentTab}
      />
      <div className="mt-6">
        <ExercisesList exercises={currentTab?.exercises || []} />
      </div>
    </div>
  );
}

export function ExercisesHeader({
  tabs,
  currentTab,
  onTabChange,
}: {
  tabs: Tab[];
  currentTab: Tab | null;
  onTabChange: (tab: Tab) => void;
}) {
  return (
    <div className="flex items-center p-1 gap-1 bg-black/5 dark:bg-white/10 rounded-full w-fit">
      {tabs.map((tab) => {
        const isActive = currentTab?.id === tab.id;
        return (
          <button
            key={tab.id}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-4 h-10 relative",
              isActive && "text-primary-foreground dark:text-foreground",
              tab.locked && "text-muted-foreground"
            )}
            type="button"
            onClick={() => onTabChange(tab)}
            disabled={tab.locked}
          >
            {isActive && (
              <motion.span
                className="inset-0 absolute bg-primary dark:bg-white/10 rounded-full -z-[1]"
                layoutId="active-tab-indicator"
                transition={{ duration: 0.2 }}
              />
            )}
            {tab.icon && <tab.icon className="size-4" />}
            <span className="z-[2]">{tab.label}</span>
            {tab.locked && <LockIcon className="size-4" />}
          </button>
        );
      })}
    </div>
  );
}
