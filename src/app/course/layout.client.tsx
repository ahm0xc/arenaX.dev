"use client";

import type { ReactNode } from "react";
import { DocsLayout } from "fumadocs-ui/layouts/docs";

import { baseOptions } from "~/app/layout.config";
import { source } from "~/lib/source";

import { useMode } from "../layout.client";
import { Icons } from "~/components/icons";

export function CourseLayout({ children }: { children: ReactNode }) {
  const mode = useMode();

  return (
    <DocsLayout
      {...baseOptions}
      tree={source.pageTree}
      nav={{
        ...baseOptions.nav,
        title: (
          <div className="flex items-center gap-2">
            <Icons.logo
              className="w-5 h-5"
              style={{ color: `var(--${mode}-color)` }}
            />
            <div>
              <span className="font-medium [header_&]:text-[15px]">
                Arena
                <span className="text-[var(--color-fd-primary)] text-base">
                  X
                </span>
                .dev
              </span>
            </div>
          </div>
        ),
        transparentMode: "top",
      }}
      sidebar={{
        tabs: {
          transform(option, node) {
            const meta = source.getNodeMeta(node);
            if (!meta) return option;

            return {
              ...option,
              icon: (
                <div
                  className="rounded-md border bg-gradient-to-t from-fd-background/80 p-1 shadow-md [&_svg]:size-5"
                  style={{
                    color: `var(--${meta.file.dirname}-color)`,
                    backgroundColor: `color-mix(in oklab, var(--${meta.file.dirname}-color) 15%, transparent)`,
                  }}
                >
                  {node.icon}
                </div>
              ),
            };
          },
        },
      }}
      // TODO: add banner
      // banner: <div className="flex items-center justify-between">hello</div>,
    >
      {children}
    </DocsLayout>
  );
}
