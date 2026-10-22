import "./preview.css";
import { astroSource } from "./source";
import React, { useContext } from "react";
import {
  Title,
  Subtitle,
  Description,
  Canvas,
  Controls,
  DocsContext,
  Subheading,
} from "@storybook/addon-docs/blocks";
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
astroLanguage.aliases = [];
SyntaxHighlighter.registerLanguage("astro", astroLanguage);

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
