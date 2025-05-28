import React from "react";
import { Avatar, Box, Chip, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { ArticleMetadataBox, AuthorInfoBox, CoverImageBox, DetailArticleContainer, TiptapContainer } from "./styles";
import { EditorContent, EditorProvider, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
// import "./styles.scss";
import { mockedContent } from "./mockedContentArticle";

function DetailArticle() {
  const { articleId } = useParams();
  
  const extensions = [
    // Color.configure({ types: [TextStyle.name, ListItem.name] }),
    // TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
    }),
  ]

  const editor = useEditor({
    extensions,
    content: mockedContent,
    editable: false,
  })
  // 4e1e2a41-4d9c-4576-8797-bb443f88ce8d

  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  const getArticleId = () => {
    const articleIdInArray = articleId?.split("-");
    const idSplited = articleIdInArray?.slice(articleIdInArray.length - 5, articleIdInArray.length);

    return idSplited?.join("-");
  }

  const getArticleName = () => {
    const articleIdInArray = articleId?.split("-");
    const idSplited = articleIdInArray?.slice(0, articleIdInArray.length - 5);

    return idSplited?.join(" ");
  }

  return (
    <DetailArticleContainer>
      <Box>
        <CoverImageBox>
          <Chip label="asd"></Chip>
        </CoverImageBox>

        <ArticleMetadataBox>
          <Box>
            <Typography variant="h2">
              {getArticleName()}
            </Typography>

            <Typography variant="subtitle1">
              2 min leitura
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <AuthorInfoBox>
              <Avatar />
              <Typography variant="body1" sx={{ maxWidth: '150px' }}>
                Dev Fornt ENd | Camilla Barena
              </Typography>
            </AuthorInfoBox>

            <Typography variant="caption">
              22h, 19 de agosto 2023
            </Typography>
          </Box>
        </ArticleMetadataBox>
      </Box>

      <TiptapContainer
        editor={editor}
      />
    </DetailArticleContainer>
  );
}

export { DetailArticle };