import React from "react";
import { Avatar, Chip, Typography } from "@mui/material";
import { ArticleAuthorInfoBox, ArticleCardContainer, ArticleCardContentBox, ArticleDetailBox, ArticleImageBox, ArticleMetadataBox, ArticleReadTimeBox, ArticleTagsBox } from "./styles";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useNavigate } from "react-router-dom";

function ArticleCard() {
  const navigate = useNavigate();
  return (
    <ArticleCardContainer onClick={() => navigate(`/home/artigos/nome-do-artigo-770838ec-251b-43db-b93a-60ccd85e43f8`)}>
      <ArticleCardContentBox>
        <ArticleAuthorInfoBox>
          <Avatar />
          <Typography>
            Dev Front End | Camilla Barena
          </Typography>
        </ArticleAuthorInfoBox>

        <ArticleDetailBox>
          <Typography variant="h5">
            Primeiros passos Docker
          </Typography>

          <Typography color="#545454">
            Lorem ipsum dolor sit amet consectetur. Facilisis sem tortor in quam nec. Aliquam sit habitant dui ac quis quis. Facilisis sem tortor in quam nec. Aliquam sit habitant dui ac quis quis...
          </Typography>
        </ArticleDetailBox>

        <ArticleMetadataBox>
          <ArticleTagsBox>
            <Chip label={'Docker'} />
            <Chip label={'Container'} />
            <Chip label={'Development'} />
          </ArticleTagsBox>

          <ArticleReadTimeBox>
            <Typography color="#545454" variant="body2" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <AccessTimeIcon fontSize="small" />
              2 min de leitura
            </Typography>

            <Typography variant="caption">
              22h, 19 de agosto 2023
            </Typography>
          </ArticleReadTimeBox>
        </ArticleMetadataBox>
      </ArticleCardContentBox>

      <ArticleImageBox>
        Aqui fica imagem
      </ArticleImageBox>
    </ArticleCardContainer>
  )
};

export { ArticleCard };