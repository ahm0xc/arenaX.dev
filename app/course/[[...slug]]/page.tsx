import { source } from "~/lib/source";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
  DocsCategory,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Popup, PopupContent, PopupTrigger } from "fumadocs-twoslash/ui";
import { Callout } from "fumadocs-ui/components/callout";
import { TypeTable } from "fumadocs-ui/components/type-table";
import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { File, Folder, Files } from "fumadocs-ui/components/files";
import { Mermaid } from "@theguild/remark-mermaid/mermaid";

export const dynamicParams = false;
export const revalidate = false;

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const Mdx = page.data.body;
  const toc = page.data.toc;
  const lastModified = page.data.lastModified;

  return (
    <DocsPage
      toc={toc}
      lastUpdate={lastModified}
      full={page.data.full}
      tableOfContent={{
        style: "clerk",
        single: false,
      }}
      article={{
        className: "max-sm:pb-16",
      }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody className="text-fd-foreground/80">
        <Mdx
          components={{
            ...defaultMdxComponents,
            Popup,
            PopupContent,
            PopupTrigger,
            Tabs,
            Tab,
            Mermaid,
            TypeTable,
            Accordion,
            Accordions,
            File,
            Folder,
            Files,
            Step,
            Steps,
            blockquote: Callout as unknown as React.FC<
              React.ComponentProps<"blockquote">
            >,
            DocsCategory: () => <DocsCategory page={page} from={source} />,
          }}
        />
        {/* {page.data.index ? <DocsCategory page={page} from={source} /> : null} */}
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
