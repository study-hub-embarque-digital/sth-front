import { styled } from '@mui/material/styles';
import { Avatar, Box, Paper, Typography } from '@mui/material';
import { CSSObject } from 'styled-components';

export const PostContainer = styled(Paper)(({ theme }) => [
  {
    minHeight: '210px',
    borderRadius: '5px',
    padding: '25px 30px 7px 30px',
  } as CSSObject,
  theme.applyStyles('dark', {
  }),
]);

export const PostHeader = styled(Box)(({ theme }) => [
  {
    marginBottom: '15px'
  } as CSSObject
]);

export const AvatarBox = styled(Box)(({ theme }) => [
  {
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
  } as CSSObject
]);

export const PostAvatar = styled(Avatar)(({ theme }) => [
  {
    width: 40,
    height: 40,
    marginRight: '15px'
  } as CSSObject
]);

export const PostMetadataBox = styled(Box)(({ theme }) => [
  {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '15px'
  } as CSSObject
]);

export const PostUserNameText = styled(Typography)(({ theme }) => [
  {
    margin: 0,
    padding: 0,
    lineHeight: '5px'
  } as CSSObject
]);

export const PostTimeText = styled(Typography)(({ theme }) => [
  {
    margin: 0,
    padding: 0,
    lineHeight: 0,
    color: theme.palette.text.caption
  } as CSSObject
]);

export const PostContentBox = styled(Box)(({ theme }) => [
  {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '30px'
  } as CSSObject
]);

export const PostTitleText = styled(Typography)(({ theme }) => [
  {
    margin: 0,
    padding: 0,
    fontWeight: 'bold'
  } as CSSObject
]);

export const PostContentText = styled(Typography)(({ theme }) => [
  {
    margin: 0,
    padding: 0
  } as CSSObject
]);

export const PostFooterBox = styled(Box)(({ theme }) => [
  {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: '20px'
    },
  } as CSSObject
]);

export const PostTagsBox = styled(Box)(({ theme }) => [
  {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '10px'
  } as CSSObject
]);

export const PostEngagementBox = styled(Box)(({ theme }) => [
  {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '17px'
  } as CSSObject
]);

export const PostMetricBox = styled(Box)(({ theme }) => [
  {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '3px',

  } as CSSObject
]);