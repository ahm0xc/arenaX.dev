import type { ReactNode } from "react";

import "katex/dist/katex.min.css";

import { CourseLayout } from "./layout.client";

export default function Layout({ children }: { children: ReactNode }) {
  return <CourseLayout>{children}</CourseLayout>;
}
