export type ExerciseCategory = "python" | "javascript" | "react";
export type ExerciseDifficulty =
  | "beginner"
  | "adventurer"
  | "warrior"
  | "legendary";

export type Exercise = {
  id: string;
  category: ExerciseCategory;
  title: string;
  difficulty: ExerciseDifficulty;
  description: string;
  initialCode: string;
  validations: string[];
  createdAt: Date;
  updatedAt?: Date;
};
