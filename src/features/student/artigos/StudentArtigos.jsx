import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import BreadcrumbsNav from "../../../components/aluno/BreadcrumbsNav";
import PostCard from "../../../components/aluno/PostCard";
import SearchBar from "../../../components/aluno/SearchBar";
import LayoutAluno from "../../../components/LayoutAluno";
import artigoService from "../../../services/artigoService"; 

const StudentArtigos = () => {
  const [artigos, setArtigos] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadArtigos = async () => {
    try {
      const data = await artigoService.getAllArtigos(); 
      setArtigos(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Erro ao carregar os artigos:", error);
    }
  };

  useEffect(() => {
    loadArtigos();
  }, []);

  return (
    <LayoutAluno title="Artigos">
      <BreadcrumbsNav />
      <SearchBar />
      <Box sx={{ mt: 2 }}>
        {loading ? (
          <p>Carregando artigos...</p>
        ) : (
          artigos.map((post, index) => (
            <PostCard key={index} post={post} />
          ))
        )}
      </Box>
    </LayoutAluno>
  );
};

export default StudentArtigos;
