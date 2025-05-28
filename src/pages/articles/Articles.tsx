import React from "react";
import { useNavigate } from "react-router-dom";
import { ArticleCard } from "./components/ArticleCard";
import { Box } from "@mui/material";
import { FloatButton } from "../../components/shared/float-button/FloatButton";
import { Add } from "@mui/icons-material";
import SearchBar from "../../components/aluno/SearchBar";

export function Articles() {
  const navigate = useNavigate();
  return (
    <Box sx={{
      width: '100%',
      maxWidth: '1011px'
    }}>
      <SearchBar placeholder={"Buscar artigos..."}></SearchBar>

      <Box>
        <ArticleCard></ArticleCard>
      </Box>

      <FloatButton onClick={() => navigate('/home/artigos/novo')}>
        <Add />
      </FloatButton>
    </Box >
  );
};