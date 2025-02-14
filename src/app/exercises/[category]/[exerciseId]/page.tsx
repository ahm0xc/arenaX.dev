import { allExercises } from "exercises";
import { notFound } from "next/navigation";

import Editor from "./editor";

interface PageProps {
  params: Promise<{
    category: string;
    exerciseId: string;
  }>;
}

export default async function ExercisePage(props: PageProps) {
  const { category, exerciseId } = await props.params;

  const exercise = getExercise(category, exerciseId);
  if (!exercise) {
    notFound();
  }

  return (
    <div>
      <Editor exercise={exercise} />
    </div>
  );
}

function getExercise(category: string, exerciseId: string) {
  const exercise = allExercises.find(
    (e) => e.id === exerciseId && e.category === category
  );

  return exercise;
}
