import React from "react";
import { Box, Button, Container } from "@mui/material";
import { useCurrentEditor } from "@tiptap/react";
import { IArticleActionsMenu } from "./interfaces";

function ArticleActionsMenu({ publishAction }: IArticleActionsMenu) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '8px',
        flexWrap: 'wrap',
        gap: '5px'
      }}
    >
      <Box>
        <Button variant="outlined" color="error" onClick={() => console.log('publicar')}>
          Cancelar
        </Button>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '10px'
        }}>
        {/* <Button variant="outlined" color="info" onClick={() => console.log('publicar')}>
          Salvar Rascunho
        </Button> */}

        <Button variant="contained" color="secondary" onClick={publishAction}>
          Publicar
        </Button>
      </Box>
    </Box>
  )
};

export { ArticleActionsMenu };