import type { Exercise } from "~/types";

import * as exercisesJavascript from "./javascript";
import * as exercisesPython from "./python";

export const javascriptExercises: Exercise[] = [
  ...Object.values(exercisesJavascript),
];

export const pythonExercises: Exercise[] = [...Object.values(exercisesPython)];

export const reactExercises: Exercise[] = [];

export const allExercises: Exercise[] = [
  ...pythonExercises,
  ...javascriptExercises,
  ...reactExercises,
];
