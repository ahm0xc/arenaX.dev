import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { transformerTwoslash } from "fumadocs-twoslash";
import remarkMath from "remark-math";
import {
  fileGenerator,
  remarkDocGen,
  remarkInstall,
  remarkTypeScriptToJavaScript,
} from "fumadocs-docgen";
import rehypeKatex from "rehype-katex";

export const { docs, meta } = defineDocs({
  dir: "content/courses",
});

export default defineConfig({
  lastModifiedTime: "git",
  mdxOptions: async () => {
    const { rehypeCodeDefaultOptions } = await import(
      "fumadocs-core/mdx-plugins"
    );

    return {
      rehypeCodeOptions: {
        lazy: true,
        langs: ["ts", "js", "html", "tsx", "jsx", "mdx", "rust", "css"],
        inline: "tailing-curly-colon",
        themes: {
          light: "catppuccin-latte",
          dark: "catppuccin-mocha",
        },
        transformers: [
          ...(rehypeCodeDefaultOptions.transformers ?? []),
          transformerTwoslash(),
          {
            name: "transformers:remove-notation-escape",
            code(hast) {
              for (const line of hast.children) {
                if (line.type !== "element") continue;

                const lastSpan = line.children.findLast(
                  (v) => v.type === "element"
                );

                const head = lastSpan?.children[0];
                if (head?.type !== "text") return;

                head.value = head.value.replace(/\[\\!code/g, "[!code");
              }
            },
          },
        ],
      },
      remarkPlugins: [
        remarkMath,
        [remarkInstall, { persist: { id: "package-manager" } }],
        [remarkDocGen, { generators: [fileGenerator()] }],
        remarkTypeScriptToJavaScript,
      ],
      rehypePlugins: (v) => [rehypeKatex, ...v],
    };
  },
});
