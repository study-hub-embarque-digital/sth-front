import { useState, useEffect } from "react";
import { Box, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import BreadcrumbsNav from "../../../components/aluno/BreadcrumbsNav";
import ArtigoSearchBar from "../../../components/aluno/ArtigoSearchBar";
import LayoutAluno from "../../../components/LayoutAluno";
import artigoService from "../../../services/artigoService";
import ArtigoCard from "../../../components/aluno/ArtigoCard";

const StudentArtigos = () => {
  const [artigos, setArtigos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de pesquisa
  const [searchBy, setSearchBy] = useState('titulo'); // Novo estado para o tipo de busca

  // Função que busca os artigos com base no termo de pesquisa
  const loadArtigos = async (searchTerm = "", searchBy = "titulo") => {
    try {
      setLoading(true); // Define loading como true durante a busca
      const data = await artigoService.searchArtigos(searchTerm, searchBy); // Passa o searchBy para a busca
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

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm); 
    loadArtigos(searchTerm, searchBy); // Passa searchBy para a busca
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(searchTerm); 
    }
  };

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value); // Atualiza o tipo de busca
    loadArtigos(searchTerm, e.target.value); // Realiza a busca com o novo tipo
  };

  return (
    <LayoutAluno title="Artigos">
      <BreadcrumbsNav />
      {/* Campo para selecionar o tipo de busca */}
      <FormControl sx={{ mb: 2 }}>
        <InputLabel>Buscar por</InputLabel>
        <Select
          value={searchBy}
          onChange={handleSearchByChange}
          label="Buscar por"
        >
          <MenuItem value="titulo">Título</MenuItem>
          <MenuItem value="autor">Autor</MenuItem>
        </Select>
      </FormControl>
      {/* Passando as props para o componente de busca */}
      <ArtigoSearchBar
        searchTerm={searchTerm}
        onSearch={handleSearch}
        onKeyPress={handleKeyPress}
      />
      <Box sx={{ mt: 2 }}>
        {loading ? (
          <p>Carregando artigos...</p>
        ) : (
          artigos.map((artigo) => (
            <ArtigoCard key={artigo.id} artigo={artigo} />
          ))
        )}
      </Box>
    </LayoutAluno>
  );
};

export default StudentArtigos;
