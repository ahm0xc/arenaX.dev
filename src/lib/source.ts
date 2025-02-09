import { createMDXSource } from "fumadocs-mdx";
import { loader } from "fumadocs-core/source";
import { createElement } from "react";

import { docs, meta } from "~/../.source";
import { Icons } from "~/components/icons";

export const source = loader({
  baseUrl: "/course",
  source: createMDXSource(docs, meta),
  icon(icon) {
    if (!icon) {
      // You may set a default icon
      return;
    }

    if (icon in Icons) return createElement(Icons[icon as keyof typeof Icons]);
  },
});
