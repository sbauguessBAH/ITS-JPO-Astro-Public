import "./preview.css";
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

const StoriesWithControls = () => {
  const context = useContext(DocsContext);

  return context.componentStories().map((story) => (
    <React.Fragment key={story.id}>
      <Subheading>{story.name}</Subheading>
      <Description of={story.moduleExport} />
      <Canvas of={story.moduleExport} />
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
