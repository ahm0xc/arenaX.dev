import { clsx, type ClassValue } from "clsx";
import type { PyodideInterface } from "pyodide";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function INTERNAL__getBaseUrl() {
  let siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!siteUrl && process.env.NODE_ENV !== "development") {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL is not set in the environment variables"
    );
  }

  if (!siteUrl) siteUrl = "http://localhost:3000";

  return new URL(siteUrl);
}

export const baseUrl = INTERNAL__getBaseUrl();

export function loadPyodideScript() {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js";
    script.async = true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    script.onload = () => resolve((window as any).loadPyodide);
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export async function initPyodide(): Promise<PyodideInterface | null> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const loadPyodide: any = await loadPyodideScript();
    const pyodideInstance = await loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
    });
    return pyodideInstance;
  } catch (error) {
    console.error("Failed to load Pyodide:", error);
    return null;
  }
}

export async function runPython(
  code: string,
  pyodide: PyodideInterface
): Promise<{ output: string | null; error: string | null }> {
  try {
    pyodide.runPython(`
      import sys
      from io import StringIO
      sys.stdout = StringIO()
    `);

    await pyodide.runPythonAsync(code);

    const stdout = pyodide.runPython("sys.stdout.getvalue()");

    pyodide.runPython("sys.stdout = sys.__stdout__");

    return { output: stdout, error: null };
  } catch (error) {
    return {
      output: null,
      error: `Error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
}
