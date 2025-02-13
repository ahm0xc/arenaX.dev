import React from "react";

import type { Exercise } from "~/types";

interface ExercisesListProps {
  exercises: Exercise[];
}

export default function ExercisesList({ exercises }: ExercisesListProps) {
  return (
    <div>
      {exercises.map((exercise) => (
        <ExerciseCard key={exercise.id} exercise={exercise} />
      ))}
    </div>
  );
}

function ExerciseCard({ exercise }: { exercise: Exercise }) {
  return <div>{exercise.title}</div>;
}
