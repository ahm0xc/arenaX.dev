import { SwordsIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Icons } from "~/components/icons";

import { cn } from "~/lib/utils";
import type { Exercise, ExerciseCategory, ExerciseDifficulty } from "~/types";

const icons: Record<ExerciseCategory, React.ElementType | null> = {
  python: Icons.Python,
  javascript: Icons.JavaScript,
  react: null,
};

const difficultyColors: Record<ExerciseDifficulty, string> = {
  beginner: "bg-green-500 text-green-50 dark:bg-green-700",
  adventurer: "bg-blue-500 text-blue-50 dark:bg-blue-700",
  warrior: "bg-yellow-500 text-yellow-50 dark:bg-yellow-700",
  legendary: "bg-red-500 text-red-50 dark:bg-red-700",
};

interface ExercisesListProps {
  exercises: Exercise[];
}

export default function ExercisesList({ exercises }: ExercisesListProps) {
  return (
    <div className="p-2 rounded-lg border bg-black/5 dark:bg-white/5">
      {exercises.map((exercise) => (
        <ExerciseCard key={exercise.id} exercise={exercise} />
      ))}
    </div>
  );
}

function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const Icon = icons[exercise.category] || SwordsIcon;

  return (
    <div className="flex items-center bg-card rounded-lg border px-4 py-3 w-full">
      <div className="flex items-center w-full">
        <div>
          <div
            className={cn(
              "size-4 bg-green-500 dark:bg-green-700 rounded-full relative",
              "before:content-[''] before:absolute before:size-2 before:rounded-full before:bg-card before:left-1/2 before:-translate-x-1/2 before:top-1/2 before:-translate-y-1/2"
            )}
          />
        </div>
        <Link
          href={`/exercises/${exercise.category}/${exercise.id}`}
          className="flex-1 mx-8 flex items-center gap-4"
        >
          <span className="text-sm text-muted-foreground">
            {Icon ? <Icon className="size-4" /> : exercise.category}
          </span>
          <p className="text-base font-medium">{exercise.title}</p>
        </Link>
        <div>
          <span
            className={cn(
              "text-sm text-muted-foreground px-2 py-1 rounded-full",
              difficultyColors[exercise.difficulty]
            )}
          >
            {exercise.difficulty}
          </span>
        </div>
      </div>
    </div>
  );
}
