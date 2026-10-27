/// <reference path="./prismjs.d.ts" />

import "prismjs/themes/prism.css";
import "./preview.css";
import { astroSource } from "./source";
import Prism from "prismjs";
import React, { useContext, useEffect, useState } from "react";
import {
  Title,
  Subtitle,
  Description,
  Canvas,
  Controls,
  DocsContext,
  DocsContainer,
  Source,
  Subheading,
} from "@storybook/addon-docs/blocks";
import { MDXProvider } from "@storybook/addon-docs/mdx-react-shim";
import { SyntaxHighlighter } from "storybook/internal/components";

// Prism has no Astro grammar: markup plus a TypeScript frontmatter fence.
const astroLanguage = (Prism: any) => {
  Prism.languages.astro = Prism.languages.extend("markup", {});
  Prism.languages.insertBefore("astro", "comment", {
    frontmatter: {
      pattern: /^---[\s\S]*?\n---/,
      inside: {
        punctuation: /^---|---$/,
        rest: Prism.languages.typescript,
      },
    },
  });
};
astroLanguage.displayName = "astro";
astroLanguage.aliases = [] as string[];
SyntaxHighlighter.registerLanguage("astro", astroLanguage);

let astroHighlighterPromise: Promise<(code: string) => string> | undefined;
const getAstroHighlighter = () =>
  (astroHighlighterPromise ??= (async () => {
    (globalThis as typeof globalThis & { Prism?: typeof Prism }).Prism = Prism;
    await import("prismjs/components/prism-typescript");
    const { runHighlighterWithAstro } =
      await import("@astrojs/prism/dist/highlighter");
    return (code: string) => runHighlighterWithAstro("astro", code).html;
  })());

const MarkdownCodeBlock = ({
  children,
}: React.HTMLAttributes<HTMLPreElement>) => {
  if (!React.isValidElement(children)) return <pre>{children}</pre>;

  const code = children.props as {
    className?: string;
    children?: React.ReactNode;
  };
  if (typeof code.children !== "string") return <pre>{children}</pre>;

  const language = code.className?.replace(/^language-/, "");
  const source = code.children.replace(/\n$/, "");

  if (language === "astro") {
    return <AstroMarkdownSource code={source} />;
  }

  return (
    <Source
      code={source}
      language={language as React.ComponentProps<typeof Source>["language"]}
    />
  );
};

const AstroMarkdownSource = ({ code }: { code: string }) => {
  const [html, setHtml] = useState("");

  useEffect(() => {
    let active = true;
    getAstroHighlighter()
      .then((highlight) => {
        if (active) setHtml(highlight(code));
      })
      .catch(() => {
        if (active) setHtml("");
      });

    return () => {
      active = false;
    };
  }, [code]);

  if (!html) return <Source code={code} language="text" />;

  return (
    <SyntaxHighlighter
      language="text"
      copyable
      bordered
      padded
      className="astro-mdx-source"
      renderer={() => <span dangerouslySetInnerHTML={{ __html: html }} />}
    >
      {code}
    </SyntaxHighlighter>
  );
};

const DocsContainerWithCodeBlocks = (
  props: React.ComponentProps<typeof DocsContainer>,
) => (
  <MDXProvider components={{ pre: MarkdownCodeBlock }}>
    <DocsContainer {...props} />
  </MDXProvider>
);

const StoriesWithControls = () => {
  const context = useContext(DocsContext);

  return context.componentStories().map((story) => (
    <React.Fragment key={story.id}>
      <Subheading>{story.name}</Subheading>
      <Description of={story.moduleExport} />
      <Canvas
        of={story.moduleExport}
        sourceState={story.name === "Default" ? "shown" : "none"}
      />
      {story.parameters?.controls?.disable ? null : (
        <Controls of={story.moduleExport} />
      )}
    </React.Fragment>
  ));
};

const preview = {
  argTypes: {
    class: { table: { disable: true } },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      container: DocsContainerWithCodeBlocks,
      canvas: {
        sourceState: "none",
      },
      source: {
        type: "dynamic",
        language: "astro",
        transform: astroSource,
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <StoriesWithControls />
        </>
      ),
    },
  },
  tags: ["autodocs"],
};

export default preview;
