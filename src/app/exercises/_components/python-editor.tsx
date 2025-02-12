import * as React from "react";
import type { PyodideInterface } from "pyodide";

import { Icons } from "~/components/icons";
import CustomEditor from "./custom-editor";
import { initPyodide, runPython } from "~/lib/utils";

interface PythonEditorProps {
  initialCode: string;
  onResult: (result: { output: string | null; error: string | null }) => void;
}

export default function PythonEditor({
  initialCode,
  onResult,
}: PythonEditorProps) {
  const [isRunning, setIsRunning] = React.useState(false);
  const pyodide = React.useRef<PyodideInterface | null>(null);

  async function onLoad() {
    pyodide.current = await initPyodide();
    console.info("Pyodide initialized");
  }

  async function onRun(code: string) {
    if (!pyodide.current) {
      // TODO: add a toast
      console.error("Pyodide not initialized");
      return;
    }

    setIsRunning(true);
    const result = await runPython(code, pyodide.current);
    console.log("🚀 ~ onRun ~ result:", result);
    onResult(result);
    setIsRunning(false);
  }

  return (
    <CustomEditor
      initialCode={initialCode}
      icon={<Icons.Python className="w-4 h-4" />}
      language="python"
      fileName="main.py"
      isRunning={isRunning}
      onLoad={onLoad}
      onRun={onRun}
    />
  );
}
