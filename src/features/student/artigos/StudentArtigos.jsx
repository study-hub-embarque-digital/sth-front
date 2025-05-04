import { useState, useEffect } from "react";
import { 
  Box, 
  MenuItem, 
  Select, 
  InputLabel, 
  FormControl, 
  Container, 
  Grid,
  Typography,
  CircularProgress,
  Paper,
  useTheme
} from "@mui/material";
import ArtigoSearchBar from "../../../components/aluno/ArtigoSearchBar";
import artigoService from "../../../services/artigoService";
import ArtigoCard from "../../../components/aluno/ArtigoCard";

const StudentArtigos = () => {
  const theme = useTheme();
  const [artigos, setArtigos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState('titulo');

  const loadArtigos = async (searchTerm = "", searchBy = "titulo") => {
    try {
      setLoading(true);
      const data = await artigoService.searchArtigos(searchTerm, searchBy);
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
    loadArtigos(searchTerm, searchBy);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(searchTerm); 
    }
  };

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
    loadArtigos(searchTerm, e.target.value);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ 
          fontWeight: 600,
          color: theme.palette.primary.main,
          mb: 3
        }}>
          Biblioteca de Artigos
        </Typography>
        
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Buscar por</InputLabel>
              <Select
                value={searchBy}
                onChange={handleSearchByChange}
                label="Buscar por"
                sx={{
                  backgroundColor: theme.palette.background.paper
                }}
              >
                <MenuItem value="titulo">Título</MenuItem>
                <MenuItem value="autor">Autor</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={9}>
            <ArtigoSearchBar
              searchTerm={searchTerm}
              onSearch={handleSearch}
              onKeyPress={handleKeyPress}
            />
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ mt: 2 }}>
        {loading ? (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '200px'
          }}>
            <CircularProgress size={60} />
          </Box>
        ) : artigos.length > 0 ? (
          <Grid container spacing={3}>
            {artigos.map((artigo) => (
              <Grid item xs={12} sm={6} md={4} key={artigo.id}>
                <ArtigoCard artigo={artigo} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="textSecondary">
              Nenhum artigo encontrado
            </Typography>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default StudentArtigos;