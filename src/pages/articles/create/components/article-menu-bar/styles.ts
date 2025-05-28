import { CSSObject } from 'styled-components';
import { Box, Container, IconButton, Select } from "@mui/material";
import { styled } from '@mui/material/styles';

export const ArticleMenuBarContainer = styled(Container)(({ theme }) => [
  {
    margin: '0px !important',
    padding: '0px !important',
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    }
  } as CSSObject,
  theme.applyStyles('dark', {
  }),
]);

export const ArticleMenuBarSelect = styled(Select)(({ theme }) => [
  {
    width: '200px',
    height: '50px',
    marginBottom: '5px',
    [theme.breakpoints.down('sm')]: {
    
  }
  } as CSSObject,
  theme.applyStyles('dark', {
  }),
]);

export const ArticleMenuBarButtonsBox = styled(Box)(({ theme }) => [
  {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: '5px',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: '95%'
    }
  } as CSSObject,
  theme.applyStyles('dark', {
  }),
]);

interface IArticleMenuBarButton {
  isActive?: boolean
}

export const ArticleMenuBarButton = styled(IconButton)<IArticleMenuBarButton>(({ theme, isActive = false }) => [
  {
    borderRadius: '5px',
    color: theme.palette.text.primary
  } as CSSObject,
  isActive && {
    background: theme.palette.button,
    color: theme.palette.text.primary
  },
  isActive && theme.applyStyles('light', {
    color: theme.palette.primary.main
  }),
]);