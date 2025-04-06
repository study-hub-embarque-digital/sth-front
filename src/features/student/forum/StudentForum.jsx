import { useEffect, useState } from "react";
import { getDuvidas, postDuvida } from "../../../services/forumService"
import { 
  Paper, Typography, Chip, Container, CircularProgress, Stack, Box,
  Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Autocomplete
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { Add as AddIcon } from '@mui/icons-material';
import { TokenHandler } from "../../../utils/TokenHandler";
import { jwtDecode } from "jwt-decode";

export default function ForumPage() {
  const [duvidas, setDuvidas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //new duvida
  const token = TokenHandler;
  const decoded = jwtDecode(token.accessToken);
  const usuarioId = decoded.sub;
  const [openForm, setOpenForm] = useState(false);
  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovaDuvida(prev => ({ ...prev, [name]: value }));
  };

  const [novaDuvida, setNovaDuvida] = useState({
    usuario:usuarioId,
    titulo: '',
    descricao: '',
    tags: []
  });
  const handleSubmit = async () => {
    try {
      const createdDuvida = await postDuvida(novaDuvida);
      setDuvidas(prev => [createdDuvida, ...prev]);
      handleCloseForm();
      setNovaDuvida({ titulo: '', descricao: '', tags: [] });
    } catch (err) {
      setError("Erro ao criar dúvida");
    }
  };



  useEffect(() => {
    async function loadDuvidas() {
      try {
        const data = await getDuvidas();
        setDuvidas(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Erro ao carregar dúvidas");
      } finally {
        setLoading(false);
      }
    }
    loadDuvidas();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
<Container sx={{ padding: 0, margin: 0, display: 'flex', flexDirection: 'column',minHeight: '100vh', position: 'relative', pb: 8}}>
  <Stack spacing={2}>
    {duvidas.map((duvida) => {
      return (
        <Paper 
  elevation={0}
  key={duvida.duvidaId}
  onClick={() => navigate(`/student/forum/duvida/${duvida.duvidaId}`)}
  sx={{ 
    padding: 2,
    borderLeft: '4px solid',
    borderColor: 'primary.main',
    borderRadius: 0,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'action.hover',
    }
  }}
>
  <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>{duvida.titulo}</Typography>
  <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
    {duvida.descricao}
  </Typography>
  
  <Box sx={{ 
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    justifyContent: 'space-between',
    alignItems: { xs: 'flex-start', sm: 'center' },
    gap: 1
  }}>
    <Box sx={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 1,
      maxWidth: { xs: '100%', sm: '60%' }, 
      overflow: 'hidden',
      minHeight: '32px'
    }}>

      {duvida.tags.map((tag, index) => (
        <Chip 
          key={index} 
          label={tag} 
          size="small"
          variant="outlined"
          onClick={(e) => e.stopPropagation()}
          sx={{
            flexShrink: 0 
          }}  
        />
      ))}
    </Box>
    
    {/* Container de metadados */}
    <Box sx={{ 
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' },
      alignItems: { xs: 'flex-start', sm: 'center' },
      gap: { xs: 0.5, sm: 2 },
      flexShrink: 0
    }}>
      <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 'medium' }}>
        {duvida.respostasCount || 0} respostas
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Postado por {duvida.nomeUsuario} • {new Date(duvida.criadoEm).toLocaleString()}
      </Typography>
    </Box>
  </Box>
</Paper>
      );
    })}
  </Stack>
  <Button
  variant="contained"
  onClick={handleOpenForm}
  sx={{
    position: 'fixed',
    bottom: 16,
    right: 16,
    borderRadius: '50%',
    width: 56,
    height: 56,
    minWidth: 0,
    boxShadow: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}
>
  <AddIcon fontSize="large" />
</Button>

{/* Diálogo do formulário */}
<Dialog open={openForm} fullWidth maxWidth="sm">
        <DialogTitle>Criar Nova Dúvida</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Título"
              name="titulo"
              value={novaDuvida.titulo}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Descrição"
              name="descricao"
              value={novaDuvida.descricao}
              onChange={handleInputChange}
              multiline
              rows={4}
            />
            {/*
            <Autocomplete
              multiple
              freeSolo
              //options={allTags}
              //value={novaDuvida.tags}
              //onChange={handleTagsChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="normal"
                  label="Tags"
                  placeholder="Adicione tags"
                />
              )}
              sx={{ mt: 2 }}
            /> */}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm} >Cancelar</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={!novaDuvida.titulo || !novaDuvida.descricao}
          >
            Criar Dúvida
          </Button>
        </DialogActions>
      </Dialog>


</Container>
  );
}