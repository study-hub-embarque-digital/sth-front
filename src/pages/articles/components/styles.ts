import { styled } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';
import { CSSObject } from 'styled-components';

export const ArticleCardContainer = styled(Paper)(({ theme }) => [
  {
    width: '100%',
    minHeight: '204px',
    display: 'flex',
    borderRadius: '10px',
    justifyContent: 'space-between',

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column-reverse'
    },

    ":hover": {
      cursor: 'pointer'
    },

    ":active": {
      boxShadow: 'none'
    }
  } as CSSObject,
  theme.applyStyles('dark', {
  }),
]);

export const ArticleCardContentBox = styled(Box)(({ theme }) => [
  {
    padding: '15px 16px 13px 26px',
  } as CSSObject,
  theme.applyStyles('dark', {
  }),
]);

export const ArticleAuthorInfoBox = styled(Box)(({ theme }) => [
  {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '9px',
    marginBottom: '12px',
    flexWrap: "wrap"
  } as CSSObject,
  theme.applyStyles('dark', {
  }),
]);

export const ArticleDetailBox = styled(Box)(({ theme }) => [
  {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '20px',
    flexWrap: "wrap"
  } as CSSObject,
  theme.applyStyles('dark', {
  }),
]);

export const ArticleMetadataBox = styled(Box)(({ theme }) => [
  {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: "wrap"
  } as CSSObject,
  theme.applyStyles('dark', {
  }),
]);

export const ArticleTagsBox = styled(Box)(({ theme }) => [
  {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '5px',
    flexWrap: "wrap"
  } as CSSObject,
  theme.applyStyles('dark', {
  }),
]);

export const ArticleReadTimeBox = styled(Box)(({ theme }) => [
  {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '5px',
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      marginTop: '15px'
    }
  } as CSSObject,
  theme.applyStyles('dark', {
  }),
]);

export const ArticleImageBox = styled(Box)(({ theme }) => [
  {
    width: '50rem',
    backgroundColor: 'grey',
    display: 'flex',
    borderRadius: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: '200px',
    }
  } as CSSObject,
  theme.applyStyles('dark', {
  }),
]);