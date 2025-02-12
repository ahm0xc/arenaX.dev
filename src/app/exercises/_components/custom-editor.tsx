import * as React from "react";
import { OnChange, useMonaco, OnMount, Editor } from "@monaco-editor/react";

import { Button } from "~/components/ui/button";
import { Loader2Icon, PlayIcon } from "lucide-react";

export interface CustomEditorProps {
  initialCode: string;
  icon: React.ReactNode;
  language: string;
  fileName: string;
  isRunning: boolean;
  onLoad: () => void;
  onRun: (code: string) => void;
}

export default function CustomEditor({
  initialCode,
  icon,
  language,
  fileName,
  isRunning,
  onLoad,
  onRun,
}: CustomEditorProps) {
  const [code, setCode] = React.useState(initialCode);
  const editorRef = React.useRef<Parameters<OnMount>[0]>(null);

  const monaco = useMonaco();

  const handleEditorChange: OnChange = (value) => {
    setCode(value || "");
  };

  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor;
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
    onLoad();
  }, [onLoad]);

  return (
    <div className="h-full p-2 flex flex-col">
      <div className="rounded-t-xl bg-secondary/80 border-b min-h-10 h-10 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-medium">{fileName}</span>
        </div>
        <Button
          size="sm"
          variant="secondary"
          className="h-7 w-7 p-0"
          onClick={() => onRun(code)}
          disabled={isRunning}
        >
          {isRunning ? (
            <Loader2Icon className="w-3 h-3 text-green-500 animate-spin" />
          ) : (
            <PlayIcon className="w-3 h-3 fill-green-500 text-green-500" />
          )}
        </Button>
      </div>
      <div className="flex-1">
        <Editor
          defaultLanguage={language}
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
