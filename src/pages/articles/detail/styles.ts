import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { CSSObject } from 'styled-components';
import { EditorContent } from '@tiptap/react';

export const DetailArticleContainer = styled(Box)(({ theme }) => [
  {
    width: '40vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  } as CSSObject,
  theme.applyStyles('dark', {
  }),
]);

export const CoverImageBox = styled(Box)(({ theme }) => [
  {
    width: '40vw',
    height: 'calc(40vw / 2)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    gap: '10px',
    backgroundColor: 'grey',
    padding: '10px',
    backgroundImage: "url('https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fpso4s8xkm2p6h6mtmq0n.png')",
    backgroundSize: 'cover',
    borderRadius: '8px'
  } as CSSObject,
  theme.applyStyles('dark', {
  }),
]);


export const ArticleMetadataBox = styled(Box)(({ theme }) => [
  {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '30px'
  } as CSSObject,
  theme.applyStyles('dark', {
  }),
]);

export const AuthorInfoBox = styled(Box)(({ theme }) => [
  {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '8px',
    maxWidth: '300px'
  } as CSSObject,
  theme.applyStyles('dark', {
  }),
]);


export const TiptapContainer = styled(EditorContent)(({ theme }) => ({
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
