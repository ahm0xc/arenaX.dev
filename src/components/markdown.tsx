"use client";

import * as React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CheckIcon, CopyIcon } from "lucide-react";

import { cn } from "~/lib/utils";

export function Markdown({ children }: { children: string }) {
  const [copiedCode, setCopiedCode] = React.useState("");

  async function handleCopy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(text);
      setTimeout(() => setCopiedCode(""), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  }

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className={cn(
        "prose dark:prose-invert",
        "prose-p:text-foreground/80 prose-p:text-sm prose-p:leading-6 prose-p:font-normal prose-p:text-pretty prose-p:mb-4",
        "prose-h1:text-foreground prose-h1:text-2xl prose-h1:font-bold prose-h1:mb-4",
        "prose-h2:text-foreground prose-h2:text-xl prose-h2:font-semibold prose-h2:mb-2",
        "prose-h3:text-foreground prose-h3:text-lg prose-h3:font-medium prose-h3:mb-1",
        "prose-h4:text-foreground prose-h4:text-base prose-h4:font-normal prose-h4:mb-1",
        "prose-h5:text-foreground prose-h5:text-sm prose-h5:font-normal prose-h5:mb-1",
        "prose-h6:text-foreground prose-h6:text-xs prose-h6:font-normal prose-h6:mb-1",
        "prose-pre:bg-transparent prose-pre:p-0 prose-pre:m-0"
      )}
      components={{
        // @ts-expect-error ...
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          const code = String(children).replace(/\n$/, "");

          return !inline && match ? (
            <div className="relative group">
              <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
                className="!rounded-xl"
              >
                {code}
              </SyntaxHighlighter>
              <button
                type="button"
                onClick={() => handleCopy(code)}
                className="absolute top-2 right-2 min-w-8 min-h-8 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-[2] flex items-center justify-center"
              >
                {copiedCode === code ? (
                  <CheckIcon className="w-4 h-4 text-green-400" />
                ) : (
                  <CopyIcon className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
