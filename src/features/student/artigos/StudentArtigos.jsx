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
  useTheme,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ArtigoSearchBar from "../../../components/aluno/ArtigoSearchBar";
import artigoService from "../../../services/artigoService";
import ArtigoCard from "../../../components/aluno/ArtigoCard";
import { TokenHandler } from "../../../utils/TokenHandler";
import { jwtDecode } from "jwt-decode";

const StudentArtigos = () => {
  const theme = useTheme();
  const [artigos, setArtigos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState('titulo');

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const token = TokenHandler;
  const decoded = jwtDecode(token.accessToken);
  const usuarioId = decoded.sub;

  const loadArtigos = async (term = "", by = "titulo") => {
    try {
      setLoading(true);
      const data = await artigoService.searchArtigos(term, by);
      setArtigos(data);
    } catch (error) {
      console.error("Erro ao carregar os artigos:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadTags = async () => {
    try {
      const data = await artigoService.getTags();
      setTags(data);
    } catch (error) {
      console.error("Erro ao carregar tags:", error);
    }
  };

  useEffect(() => {
    loadArtigos();
    loadTags();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    loadArtigos(term, searchBy);
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

  const handleAddArtigo = async () => {
    try {
      const tagsSelecionadas = tags
        .filter(tag => selectedTags.includes(tag.id))
        .map(tag => ({ id: tag.id, nome: tag.nome }));
  
      const novoArtigo = {
        usuario:usuarioId,
        titulo: newTitle,
        conteudo: newContent,
        tags: tagsSelecionadas
      };
      console.log(novoArtigo)
      //await artigoService.postArtigo(novoArtigo);
      setOpenAddDialog(false);
      setNewTitle("");
      setNewContent("");
      setSelectedTags([]);
      loadArtigos();
    } catch (error) {
      console.error("Erro ao criar artigo:", error);
    }
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
                sx={{ backgroundColor: theme.palette.background.paper }}
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

      {/* Botão Flutuante */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => setOpenAddDialog(true)}
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: 1000,
        }}
      >
        <AddIcon />
      </Fab>

      {/* Modal de Novo Artigo */}
      <Dialog
        open={openAddDialog}
        onClose={() => {}}
        disableEscapeKeyDown
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Novo Artigo</DialogTitle>
        <DialogContent
          sx={{
            width: '100%',
            maxWidth: '800px',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}
        >
          <TextField
            label="Título"
            fullWidth
            margin="normal"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <TextField
            label="Conteúdo"
            fullWidth
            multiline
            rows={10}
            margin="normal"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="tag-select-label">Tags</InputLabel>
            <Select
              labelId="tag-select-label"
              multiple
              value={selectedTags}
              onChange={(e) => setSelectedTags(e.target.value)}
              renderValue={(selected) =>
                tags
                  .filter((tag) => selected.includes(tag.id))
                  .map((tag) => tag.nome)
                  .join(', ')
              }
            >
              {tags.map((tag) => (
                <MenuItem key={tag.id} value={tag.id}>
                  {tag.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleAddArtigo} variant="contained" color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default StudentArtigos;
