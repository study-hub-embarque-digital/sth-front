import React from "react";
import { Box, MenuItem, Select } from "@mui/material";
import FormatBoldRoundedIcon from '@mui/icons-material/FormatBoldRounded';
import FormatItalicRoundedIcon from '@mui/icons-material/FormatItalicRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import FormatListNumberedRoundedIcon from '@mui/icons-material/FormatListNumberedRounded';
import FormatUnderlinedRoundedIcon from '@mui/icons-material/FormatUnderlinedRounded';
import StrikethroughSRoundedIcon from '@mui/icons-material/StrikethroughSRounded';
import { ArticleMenuBarButtonsBox, ArticleMenuBarContainer, ArticleMenuBarButton } from "./styles";
import { useArticleMenuBar } from "./useArticleMenuBar";
import { IArticleMenuBar } from "./interfaces";

function ArticleMenuBar({ editor }: Readonly<IArticleMenuBar>) {
  const {
    toggleBold,
    toggleItalic,
    toggleCodeBlock,
    toggleQuoteBlock,
    toggleOrderedList,
    toggleBulletList,
    toggleStrike,
    heading,
    handleChangeHeading,
  } = useArticleMenuBar(editor);

  return (
    <ArticleMenuBarContainer>
      <Box>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={heading}
          label="Título"
          onChange={handleChangeHeading}
          sx={{
            width: '200px',
            height: '50px',
            borderBlockColor: 'rgb(30, 30, 30)',
            borderColor: 'rgb(30, 30, 30)',
            marginBottom: '10px',
            ":focus": {}
          }}
        >
          <MenuItem value={0}>Parágrafo</MenuItem>
          <MenuItem value={1}>Título 1</MenuItem>
          <MenuItem value={2}>Título 2</MenuItem>
          <MenuItem value={3}>Título 3</MenuItem>
          <MenuItem value={4}>Título 4</MenuItem>
          <MenuItem value={5}>Título 5</MenuItem>
          <MenuItem value={6}>Título 6</MenuItem>
        </Select>
      </Box>

      <ArticleMenuBarButtonsBox>
        <ArticleMenuBarButton isActive={editor.isActive('bold')} onClick={toggleBold} aria-label="delete">
          <FormatBoldRoundedIcon />
        </ArticleMenuBarButton>

        <ArticleMenuBarButton isActive={editor.isActive('italic')} onClick={toggleItalic} aria-label="delete">
          <FormatItalicRoundedIcon />
        </ArticleMenuBarButton>

        <ArticleMenuBarButton isActive={editor.isActive('codeBlock')} onClick={toggleCodeBlock} aria-label="delete">
          <CodeRoundedIcon />
        </ArticleMenuBarButton>

        <ArticleMenuBarButton isActive={editor.isActive('quoteBlock')} onClick={toggleQuoteBlock} aria-label="delete">
          <FormatQuoteRoundedIcon />
        </ArticleMenuBarButton>

        <ArticleMenuBarButton isActive={editor.isActive('bulletList')} onClick={toggleBulletList} aria-label="delete">
          <FormatListBulletedRoundedIcon />
        </ArticleMenuBarButton>

        <ArticleMenuBarButton isActive={editor.isActive('orderedList')} onClick={toggleOrderedList} aria-label="delete">
          <FormatListNumberedRoundedIcon />
        </ArticleMenuBarButton>

        <ArticleMenuBarButton onClick={() => console.log('ação')} aria-label="delete">
          <FormatUnderlinedRoundedIcon />
        </ArticleMenuBarButton>

        <ArticleMenuBarButton onClick={toggleStrike} aria-label="toggle strike">
          <StrikethroughSRoundedIcon />
        </ArticleMenuBarButton>
      </ArticleMenuBarButtonsBox>
    </ArticleMenuBarContainer>
  )
};

export { ArticleMenuBar };