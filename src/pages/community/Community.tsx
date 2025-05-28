import React from "react";
import { Container, Fab } from "@mui/material";
import { PostCard } from "./components/post-card/PostCard";
import { mockedPosts } from "./mock";
import Add from '@mui/icons-material/Add';
import { FloatButton } from "../../components/shared/float-button/FloatButton";

function Community() {
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', gap: '23px' }}>
      {mockedPosts.map((post, index) => {
        return <PostCard
          commentsCount={post.commentsCount}
          content={post.content}
          createdAt={post.createdAt}
          likesCount={post.likesCount}
          title={post.title}
          tags={post.tags}
          userName={post.userName}
          viewCount={post.viewCount}
          key={post.title}
          picture={post.picture}
        />
      })}

      <FloatButton onClick={() => console.log('oi')}>
        <Add />
      </FloatButton>
    </Container>
  );
}

export { Community }