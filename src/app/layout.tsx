import type { ReactNode } from "react";
import { Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { RootProvider } from "fumadocs-ui/provider";

import { Body } from "./layout.client";
import { createMetadata } from "~/lib/metadata";
import { baseUrl } from "~/lib/utils";

import "./global.css";

export const metadata = createMetadata({
  title: {
    template: "%s | ArenaX.dev",
    default: "ArenaX.dev",
  },
  description: "",
  metadataBase: baseUrl,
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#090909" },
    { media: "(prefers-color-scheme: light)", color: "#fff" },
  ],
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/icons/favicon.ico" type="image/x-icon" />
        <link
          rel="icon"
          href="/icons/favicon-dark.ico"
          type="image/x-icon"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          href="/icons/favicon-light.ico"
          type="image/x-icon"
          media="(prefers-color-scheme: dark)"
        />
      </head>

      <Body>
        <RootProvider>{children}</RootProvider>
      </Body>
    </html>
  );
}
