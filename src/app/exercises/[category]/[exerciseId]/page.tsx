import { allExercises } from "exercises";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    category: string;
    exerciseId: string;
  }>;
}

export default async function ExercisePage(props: PageProps) {
  const { category, exerciseId } = await props.params;
  console.log("🚀 ~ ExercisePage ~ category:", category);
  console.log("🚀 ~ ExercisePage ~ exerciseId:", exerciseId);
  const exercise = getExercise(category, exerciseId);
  if (!exercise) {
    notFound();
  }

  return (
    <div>
      <h1>{exercise.title}</h1>
      <p>{exercise.description}</p>
      <p>{exercise.initialCode}</p>
    </div>
  );
}

function getExercise(category: string, exerciseId: string) {
  const exercise = allExercises.find(
    (e) => e.id === exerciseId && e.category === category
  );

  return exercise;
}
