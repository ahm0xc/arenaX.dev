import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "~/lib/utils";

export function Markdown({ children }: { children: string }) {
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
        "prose-h6:text-foreground prose-h6:text-xs prose-h6:font-normal prose-h6:mb-1"
      )}
    >
      {children}
    </ReactMarkdown>
  );
}
