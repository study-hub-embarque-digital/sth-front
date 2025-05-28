import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { Editor } from "@tiptap/react";

const useArticleMenuBar = (editor: Editor) => {
  const [heading, setHeading] = useState('0');

  const handleChangeHeading = (event: SelectChangeEvent) => {
    setHeading(event.target.value);

    if (Number(event.target.value) <= 0) {
      editor
        ?.chain()
        .setParagraph()
        .run();

      return;
    }

    editor
      ?.chain()
      .setHeading({
        level: event.target.value as any
      }).run()
  };

  const toggleBold = () => {
    editor
      ?.chain()
      .toggleBold()
      .run();
  }

  const toggleItalic = () => {
    editor
      ?.chain()
      .toggleItalic()
      .run();
  }

  const toggleCodeBlock = () => {
    editor
      ?.chain()
      .toggleCodeBlock()
      .run();
  }

  const toggleQuoteBlock = () => {
    editor
      ?.chain()
      .toggleBlockquote()
      .run();
  }

  const toggleOrderedList = () => {
    editor
      ?.chain()
      .toggleOrderedList()
      .run();
  }

  const toggleBulletList = () => {
    editor
      ?.chain()
      .toggleBulletList()
      .run();
  }

  const toggleStrike = () => {
    editor
      ?.chain()
      .toggleStrike()
      .run();
  }

  return {
    toggleBold,
    toggleItalic,
    toggleCodeBlock,
    toggleQuoteBlock,
    toggleOrderedList,
    toggleBulletList,
    toggleStrike,
    heading,
    handleChangeHeading,
    // editor
  }
}

export { useArticleMenuBar };