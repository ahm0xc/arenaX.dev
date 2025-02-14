import { Exercise } from "~/types";

const reverseAString: Exercise = {
  id: "reverse-a-string",
  title: "Reverse a String",
  category: "javascript",
  difficulty: "beginner",
  createdAt: new Date("2025-02-14"),
  description: `Write a function \`reverseString(str)\` that takes a string and returns it reversed.
## Example 
\`\`\`js
reverseString("hello") // "olleh"
reverseString("world") // "dlrow"
\`\`\`
`,
  initialCode: `function reverseString(str) {
  // Your code here
}`,
  validations: [],
};

export default reverseAString;
