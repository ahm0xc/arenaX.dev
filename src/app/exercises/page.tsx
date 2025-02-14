import Hero from "./_components/hero";
import ExercisesExplorer from "./_components/exercises-explorer";

export default function Exercises() {
  return (
    <div className="">
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-background bg-[radial-gradient(100%_50%_at_50%_0%,rgba(163,0,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]" />
      <div>
        <Hero />
        <section className="max-w-4xl mx-auto">
          <ExercisesExplorer />
        </section>
      </div>
    </div>
  );
}

// "use client";

// import {
//   ChartNoAxesColumnIcon,
//   SettingsIcon,
//   TerminalIcon,
// } from "lucide-react";
// import Link from "next/link";
// import { create } from "zustand";

// import {
//   ResizableHandle,
//   ResizablePanel,
//   ResizablePanelGroup,
// } from "~/components/ui/resizable";
// import { Icons } from "~/components/icons";
// import { Button } from "~/components/ui/button";
// import { Markdown } from "~/components/markdown";
// import { Badge } from "~/components/ui/badge";
// import PythonEditor from "./_components/python-editor";

// interface ExerciseStore {
//   result: { output: string | null; error: string | null };
//   setResult: (result: { output: string | null; error: string | null }) => void;
// }

// export const useExerciseStore = create<ExerciseStore>((set) => ({
//   result: { output: null, error: null },
//   setResult: (result) => set({ result }),
// }));

// export default function Exercises() {
//   return (
//     <div className="h-screen">
//       <Header />
//       <div className="h-[calc(100vh-4rem)]">
//         <ResizablePanelGroup direction="horizontal" className="rounded-lg">
//           <ResizablePanel defaultSize={40} minSize={25}>
//             <DocumentArea />
//           </ResizablePanel>
//           <ResizableHandle className="bg-transparent" withHandle />
//           <ResizablePanel defaultSize={60} minSize={25}>
//             <ResizablePanelGroup direction="vertical">
//               <ResizablePanel defaultSize={70}>
//                 <EditorArea />
//               </ResizablePanel>
//               <ResizablePanel defaultSize={30} minSize={30} maxSize={30}>
//                 <OutputArea />
//               </ResizablePanel>
//             </ResizablePanelGroup>
//           </ResizablePanel>
//         </ResizablePanelGroup>
//       </div>
//     </div>
//   );
// }

// function Header() {
//   return (
//     <div className="h-16 px-4 md:px-8 flex items-center justify-between">
//       <div className="flex items-center gap-2">
//         <div className="flex items-center gap-2">
//           <Link href="/">
//             <Icons.logo className="h-5 w-5" />
//           </Link>
//           <span className="text-lg text-muted-foreground/50">/</span>
//           <span className="text-lg font-medium">Exercises</span>
//         </div>
//       </div>
//       <div className="flex items-center justify-center">
//         <Button variant="secondary" className="rounded-r-none gap-2" size="sm">
//           <ChartNoAxesColumnIcon className="w-4 h-4" />
//           Leaderboard
//         </Button>
//         <Button variant="secondary" className="rounded-l-none gap-2" size="sm">
//           <SettingsIcon className="w-4 h-4" />
//           Settings
//         </Button>
//       </div>
//       <div className="flex items-center gap-2 bg-secondary rounded-full p-1 pr-3">
//         <img
//           src="https://github.com/shadcn.png"
//           className="w-7 h-7 rounded-full"
//         />
//         <div className="flex flex-col">
//           <span className="text-[12px] font-medium text-secondary-foreground">
//             Ahmed
//           </span>
//           <span className="text-[10px] text-secondary-foreground/80">
//             @ahm0xc
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// const markdown = `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

// You may assume that each input would have **exactly** one solution, and you may not use the same element twice.

// **Example 1:**

// \`\`\`python
// nums = [2, 7, 11, 15]
// target = 9

// Output: [0, 1]
// \`\`\`

// **Example 2:**

// \`\`\`python
// nums = [3, 2, 4]
// target = 6

// Output: [1, 2]
// \`\`\`

// ## Constraints

// - 2 <= nums.length <= 10^4
// - -10^9 <= nums[i] <= 10^9
// - -10^9 <= target <= 10^9
// - Only one valid answer exists.

// **Follow up:** Can you come up with an algorithm that is less than O(n^2) time complexity?
// `;

// function DocumentArea() {
//   return (
//     <div className="flex h-full flex-col p-2">
//       <div className="bg-secondary/80 rounded-t-xl border-b min-h-10 h-10"></div>
//       <div className="flex-1 bg-[#0c0c0c] overflow-y-scroll p-4">
//         <div className="flex flex-col gap-2 mb-8">
//           <h1 className="text-2xl font-bold">11. Two Sum</h1>
//           <div>
//             <Badge variant="default">Easy</Badge>
//           </div>
//         </div>
//         <Markdown>{markdown}</Markdown>
//       </div>
//       <div className="bg-secondary/80 rounded-b-xl border-t min-h-10 h-10"></div>
//     </div>
//   );
// }

// const initialCode = `# Solution
// def two_sum(nums, target):
//     for i in range(len(nums)):
//         for j in range(i + 1, len(nums)):
//             if nums[i] + nums[j] == target:
//                 return [i, j]

// print(two_sum([2, 7, 11, 15], 9))
// print(two_sum([3, 2, 4], 6))
// `;

// function EditorArea() {
//   const { setResult } = useExerciseStore();
//   return <PythonEditor initialCode={initialCode} onResult={setResult} />;
// }

// function OutputArea() {
//   const { result } = useExerciseStore();
//   return (
//     <div className="flex h-full flex-col p-2">
//       <div className="bg-secondary/80 rounded-t-xl border-b min-h-10 h-10">
//         <div className="h-full flex items-center justify-between px-4">
//           <div className="flex items-center gap-2">
//             <TerminalIcon className="w-4 h-4" />
//             <span className="text-sm font-medium">output</span>
//           </div>
//         </div>
//       </div>
//       <div className="flex-1 bg-[#0c0c0c] overflow-y-scroll p-4">
//         {result.output && (
//           <div className="text-sm text-foreground whitespace-pre-wrap">
//             {result.output}
//           </div>
//         )}
//         {result.error && (
//           <div className="text-sm text-red-500 whitespace-pre-wrap">
//             {result.error}
//           </div>
//         )}
//       </div>
//       <div className="bg-secondary/80 rounded-b-xl border-t min-h-10 h-10"></div>
//     </div>
//   );
// }
