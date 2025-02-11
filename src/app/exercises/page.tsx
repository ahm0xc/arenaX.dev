"use client";

import * as React from "react";
import Editor, {
  useMonaco,
  type OnChange,
  type OnMount,
} from "@monaco-editor/react";
import { PlayIcon, SettingsIcon } from "lucide-react";
import type { PyodideInterface } from "pyodide";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";
import { Icons } from "~/components/icons";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Markdown } from "~/components/markdown";
import { Badge } from "~/components/ui/badge";

export default function Exercises() {
  return (
    <div className="h-screen">
      <Header />
      <div className="h-[calc(100vh-4rem)]">
        <ResizablePanelGroup direction="horizontal" className="rounded-lg">
          <ResizablePanel defaultSize={40} minSize={25}>
            <DocumentArea />
          </ResizablePanel>
          <ResizableHandle className="bg-transparent" />
          <ResizablePanel defaultSize={60} minSize={25}>
            <EditorArea />
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
          <Link href="/">
            <Icons.logo className="h-5 w-5" />
          </Link>
          <span className="text-lg text-muted-foreground/50">/</span>
          <span className="text-lg font-medium">Exercises</span>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Button variant="secondary" className="rounded-r-none gap-2" size="sm">
          <PlayIcon className="w-4 h-4" />
          Run
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

const markdown = `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly** one solution, and you may not use the same element twice.

**Example 1:**

\`\`\`python
nums = [2, 7, 11, 15]
target = 9

Output: [0, 1]
\`\`\`

**Example 2:**

\`\`\`python
nums = [3, 2, 4]
target = 6

Output: [1, 2]
\`\`\`

## Constraints

- 2 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9
- -10^9 <= target <= 10^9
- Only one valid answer exists.

**Follow up:** Can you come up with an algorithm that is less than O(n^2) time complexity?
`;

function DocumentArea() {
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
        <Markdown>{markdown}</Markdown>
      </div>
      <div className="bg-secondary/80 rounded-b-xl border-t min-h-10 h-10"></div>
    </div>
  );
}

const initialCode = `# Solution
def two_sum(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
`;

function EditorArea() {
  const [code, setCode] = React.useState(initialCode);
  const editorRef = React.useRef<Parameters<OnMount>[0]>(null);
  const [output, setOutput] = React.useState("");
  console.log("🚀 ~ EditorArea ~ output:", output);
  const [loading, setLoading] = React.useState(true);
  console.log("🚀 ~ EditorArea ~ loading:", loading);
  const pyodide = React.useRef<PyodideInterface | null>(null);

  const monaco = useMonaco();

  const handleEditorChange: OnChange = (value) => {
    setCode(value || "");
  };

  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  const runCode = async () => {
    if (!pyodide) return;

    try {
      setOutput("");

      pyodide.current?.runPython(`
        import sys
        from io import StringIO
        sys.stdout = StringIO()
      `);

      await pyodide.current?.runPythonAsync(code);

      const stdout = pyodide.current?.runPython("sys.stdout.getvalue()");
      setOutput(stdout);

      pyodide.current?.runPython("sys.stdout = sys.__stdout__");
    } catch (error) {
      setOutput(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  };

  React.useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme("dracula", {
        base: "vs-dark",
        inherit: true,
        rules: [
          {
            background: "0c0c0c",
            token: "",
          },
          {
            foreground: "6e6e6e",
            token: "comment",
          },
          {
            foreground: "f1fa8c",
            token: "string",
          },
          {
            foreground: "bd93f9",
            token: "constant.numeric",
          },
          {
            foreground: "bd93f9",
            token: "constant.language",
          },
          {
            foreground: "bd93f9",
            token: "constant.character",
          },
          {
            foreground: "bd93f9",
            token: "constant.other",
          },
          {
            foreground: "ffb86c",
            token: "variable.other.readwrite.instance",
          },
          {
            foreground: "ff79c6",
            token: "constant.character.escaped",
          },
          {
            foreground: "ff79c6",
            token: "constant.character.escape",
          },
          {
            foreground: "ff79c6",
            token: "string source",
          },
          {
            foreground: "ff79c6",
            token: "string source.ruby",
          },
          {
            foreground: "ff79c6",
            token: "keyword",
          },
          {
            foreground: "ff79c6",
            token: "storage",
          },
          {
            foreground: "8be9fd",
            fontStyle: "italic",
            token: "storage.type",
          },
          {
            foreground: "50fa7b",
            fontStyle: "underline",
            token: "entity.name.class",
          },
          {
            foreground: "50fa7b",
            fontStyle: "italic underline",
            token: "entity.other.inherited-class",
          },
          {
            foreground: "50fa7b",
            token: "entity.name.function",
          },
          {
            foreground: "ffb86c",
            fontStyle: "italic",
            token: "variable.parameter",
          },
          {
            foreground: "ff79c6",
            token: "entity.name.tag",
          },
          {
            foreground: "50fa7b",
            token: "entity.other.attribute-name",
          },
          {
            foreground: "8be9fd",
            token: "support.function",
          },
          {
            foreground: "6be5fd",
            token: "support.constant",
          },
          {
            foreground: "66d9ef",
            fontStyle: " italic",
            token: "support.type",
          },
          {
            foreground: "66d9ef",
            fontStyle: " italic",
            token: "support.class",
          },
          {
            foreground: "f8f8f0",
            background: "ff79c6",
            token: "invalid",
          },
          {
            foreground: "f8f8f0",
            background: "bd93f9",
            token: "invalid.deprecated",
          },
          {
            foreground: "cfcfc2",
            token: "meta.structure.dictionary.json string.quoted.double.json",
          },
          {
            foreground: "6e6e6e",
            token: "meta.diff",
          },
          {
            foreground: "6e6e6e",
            token: "meta.diff.header",
          },
          {
            foreground: "ff79c6",
            token: "markup.deleted",
          },
          {
            foreground: "50fa7b",
            token: "markup.inserted",
          },
          {
            foreground: "e6db74",
            token: "markup.changed",
          },
          {
            foreground: "bd93f9",
            token: "constant.numeric.line-number.find-in-files - match",
          },
          {
            foreground: "e6db74",
            token: "entity.name.filename",
          },
          {
            foreground: "f83333",
            token: "message.error",
          },
          {
            foreground: "eeeeee",
            token:
              "punctuation.definition.string.begin.json - meta.structure.dictionary.value.json",
          },
          {
            foreground: "eeeeee",
            token:
              "punctuation.definition.string.end.json - meta.structure.dictionary.value.json",
          },
          {
            foreground: "8be9fd",
            token: "meta.structure.dictionary.json string.quoted.double.json",
          },
          {
            foreground: "f1fa8c",
            token:
              "meta.structure.dictionary.value.json string.quoted.double.json",
          },
          {
            foreground: "50fa7b",
            token:
              "meta meta meta meta meta meta meta.structure.dictionary.value string",
          },
          {
            foreground: "ffb86c",
            token:
              "meta meta meta meta meta meta.structure.dictionary.value string",
          },
          {
            foreground: "ff79c6",
            token: "meta meta meta meta meta.structure.dictionary.value string",
          },
          {
            foreground: "bd93f9",
            token: "meta meta meta meta.structure.dictionary.value string",
          },
          {
            foreground: "50fa7b",
            token: "meta meta meta.structure.dictionary.value string",
          },
          {
            foreground: "ffb86c",
            token: "meta meta.structure.dictionary.value string",
          },
        ],
        colors: {
          "editor.foreground": "#f8f8f2",
          "editor.background": "#0c0c0c",
          "editor.selectionBackground": "#212121",
          "editor.lineHighlightBackground": "#212121",
          "editorCursor.foreground": "#f8f8f0",
          "editorWhitespace.foreground": "#3B3A32",
          "editorIndentGuide.activeBackground": "#9D550FB0",
          "editor.selectionHighlightBorder": "#222218",
        },
      });

      monaco.editor.setTheme("dracula");
    }
  }, [monaco]);

  React.useEffect(() => {
    const loadPyodideScript = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js";
        script.async = true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        script.onload = () => resolve((window as any).loadPyodide);
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const initPyodide = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const loadPyodide: any = await loadPyodideScript();
        const pyodideInstance = await loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
        });
        pyodide.current = pyodideInstance;
        setLoading(false);
      } catch (error) {
        console.error("Failed to load Pyodide:", error);
        setOutput("Error: Failed to load Python environment");
      }
    };

    initPyodide();
  }, []);

  return (
    <div className="h-full p-2 flex flex-col">
      <div className="rounded-t-xl bg-secondary/80 border-b min-h-10 h-10 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Icons.Python className="w-4 h-4" />
          <span className="text-sm font-medium">index.py</span>
        </div>
        <Button variant="secondary" onClick={runCode}>
          Run
        </Button>
      </div>
      <div className="flex-1">
        <Editor
          defaultLanguage="python"
          defaultValue={code}
          onMount={handleEditorMount}
          onChange={handleEditorChange}
          options={{
            minimap: {
              enabled: false,
            },
            fontSize: 18,
            lineNumbers: "on",
            rulers: [],
            wordWrap: "off",
            folding: true,
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
      <div className="rounded-b-xl bg-secondary/80 border-t min-h-10 h-10 flex items-center justify-between px-4">
        <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <div className="bg-green-500 rounded-full w-2 h-2" /> saved
        </span>
      </div>
    </div>
  );
}
