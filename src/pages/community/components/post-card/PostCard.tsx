import React from "react";
import { Chip, Typography } from "@mui/material";
import { AvatarBox, PostAvatar, PostContainer, PostContentBox, PostContentText, PostEngagementBox, PostFooterBox, PostHeader, PostMetadataBox, PostMetricBox, PostTagsBox, PostTimeText, PostTitleText, PostUserNameText } from "./styles";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { IPostCard } from "./intefaces";

function PostCard({
  userName,
  picture,
  createdAt,
  title,
  content,
  tags,
  viewCount,
  commentsCount,
  likesCount
}: Readonly<IPostCard>) {
  return (
    <PostContainer elevation={1}>
      <PostHeader>
        <AvatarBox>
          <PostAvatar
            alt={userName}
            src={picture}
          />

          <PostMetadataBox>
            <PostUserNameText>
              {userName}
            </PostUserNameText>

            <PostTimeText variant="caption">
              {createdAt}
            </PostTimeText>
          </PostMetadataBox>
        </AvatarBox>
      </PostHeader>

      <PostContentBox>
        <PostTitleText>
          {title}
        </PostTitleText>

        <PostContentText>
          {content}
        </PostContentText>
      </PostContentBox>

      <PostFooterBox>
        <PostTagsBox>
          {tags.map(tag => {
            return <Chip label={tag} key={tag} />
          })}
        </PostTagsBox>

        <PostEngagementBox>
          <PostMetricBox>
            <RemoveRedEyeOutlinedIcon />
            <Typography variant="body2">
              {viewCount}
            </Typography>
          </PostMetricBox>

          <PostMetricBox>
            <ChatBubbleOutlineOutlinedIcon />
            <Typography variant="body2">
              {commentsCount}
            </Typography>
          </PostMetricBox>

          <PostMetricBox>
            <ThumbUpOutlinedIcon />
            <Typography variant="body2">
              {likesCount}
            </Typography>
          </PostMetricBox>
        </PostEngagementBox>
      </PostFooterBox>
    </PostContainer>
  )
}

export { PostCard };