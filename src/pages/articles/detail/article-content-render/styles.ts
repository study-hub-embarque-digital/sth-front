import { styled } from "@mui/material";
import { EditorContent } from "@tiptap/react";

export const STHEditorContentRender = styled(EditorContent)(({ theme }) => ({
  '&:first-child': {
    marginTop: 0,
  },
  backgroundColor: '#FFFFFF00',
  borderRadius: 5,
  width: '100%',
  minHeight: '75vh',
  padding: 5,

  ul: {
    padding: '0 1rem',
    margin: '1.25rem 1rem 1.25rem 0.4rem',

    'li p': {
      marginTop: '0.25em',
      marginBottom: '0.25em',
    },
  },

  ol: {
    padding: '0 1rem',
    margin: '1.25rem 1rem 1.25rem 0.4rem',

    'li p': {
      marginTop: '0.25em',
      marginBottom: '0.25em',
    },
  },

  code: {
    backgroundColor: '#000',
    borderRadius: '0.4rem',
    color: '#FFF',
    fontSize: '0.85rem',
    padding: '0.25em 0.3em',
  },

  pre: {
    background: '#000',
    borderRadius: '0.5rem',
    color: '#FFF',
    fontFamily: `'JetBrainsMono', monospace`,
    margin: '2rem 10rem',
    padding: '1rem',

    code: {
      background: 'none',
      color: 'inherit',
      fontSize: '0.8rem',
      padding: 0,
    },
  },

  blockquote: {
    borderLeft: '3px solid gray',
    margin: '1.5rem 0',
    paddingLeft: '1rem',
  },

  hr: {
    border: 'none',
    borderTop: '1px solid gray',
    margin: '2rem 0',
  },
}));