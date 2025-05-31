import { useEffect, useState } from "react";
import { getDuvidas, getTags, postDuvida } from "../../../services/forumService"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { green } from '@mui/material/colors';
import { 
  Paper, Typography, Chip, Container, CircularProgress, Stack, Box,
  Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField,  Autocomplete, InputAdornment, Avatar
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import {  Search as SearchIcon, Add as AddIcon } from '@mui/icons-material';
import { TokenHandler } from "../../../utils/TokenHandler";
import { jwtDecode } from "jwt-decode";


export default function ForumPage() {

  const loadDuvidas = async () => {
    try {
      const data = await getDuvidas();
      setDuvidas(Array.isArray(data) ? data : []);
      setFilteredDuvidas(data); 
    } catch (err) {
      setError("Erro ao carregar dúvidas");
    }
    finally{
      setLoading(false);
    }
  };
  
  const loadAllTags = async () => {
    try {
      const tags = await getTags();
      setAllTags(Array.isArray(tags) ? tags : []);
    } catch (err) {
      setError("Erro ao carregar Tags");
    }
    finally{
      setLoading(false);
    }
  };
  
  const [duvidas, setDuvidas] = useState([]);
  const [filteredDuvidas, setFilteredDuvidas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const filterDuvidas = (term) => {
    if (!term) {
      setFilteredDuvidas(duvidas);
      return;
    }
  
    const lowerCaseTerm = term.toLowerCase();
    const filtered = duvidas.filter(duvida => {
      return (
        duvida.titulo.toLowerCase().includes(lowerCaseTerm) ||
        duvida.descricao.toLowerCase().includes(lowerCaseTerm) ||
        (duvida.tags && duvida.tags.some(tag => tag.toLowerCase().includes(lowerCaseTerm)))
      ); 
    }); 
  
    setFilteredDuvidas(filtered);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterDuvidas(term);
  };

  //new duvida
  const token = TokenHandler;
  const decoded = jwtDecode(token.accessToken);
  const usuarioId = decoded.sub;
  const [allTags, setAllTags] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => {
    setOpenForm(false);
    setNovaDuvida({ titulo: '', descricao: '', tags: [] });
  };
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
      const payload = {
        ...novaDuvida,
        ...(novaDuvida.tags?.length === 0 && { tags: undefined }) // Remove se vazio
      };
      
      const createdDuvida = await postDuvida(payload);
      handleCloseForm();
      await loadDuvidas();
      setNovaDuvida({ titulo: '', descricao: '', tags: [] });
    } catch (err) {
      setError("Erro ao criar dúvida");
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);;
    loadDuvidas();
    loadAllTags();
    }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  function formatarData(data) {
  const diff = Math.floor((new Date() - new Date(data)) / (1000 * 60 * 60 * 24));
  return diff === 0 ? 'hoje' : `há ${diff} dia${diff > 1 ? 's' : ''}`;
}


  return (
<Container sx={{ padding: 0, margin: 0, marginRight:10, marginLeft:10, display: 'flex', flexDirection: 'column',minHeight: '100vh', position: 'relative', pb: 8}}>
  
<TextField
  fullWidth
  variant="outlined"
  placeholder="Buscar por título, descrição ou tags..."
  value={searchTerm}
  onChange={handleSearchChange}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon />
      </InputAdornment>
    ),
  }}
  sx={{
    mb: 3,
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
    }
  }}
/>
<Stack spacing={2}>
  {filteredDuvidas.map((duvida) => (
    <Paper
      elevation={1}
      key={duvida.duvidaId}
      onClick={() => navigate(`/home/forum/duvida/${duvida.duvidaId}`)}
      sx={{
        p: 2,
        borderRadius: 3,
        cursor: 'pointer',
        '&:hover': { boxShadow: 3 },
        minHeight:'100px'
      }}
    >
      <Box
        sx={{
          height: '100%',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr' },
          gridTemplateRows: { xs: 'auto auto auto', sm: 'auto auto' },
          gap: 1.5,
        }}
      >
        {/* Check + Título */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {duvida.resolvida ? (
            <CheckCircleIcon sx={{ color: green[500], fontSize: 40 }} />
          ) : (
            <Box sx={{ width: 24, height: 24 }} />
          )}
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {duvida.titulo}
          </Typography>
        </Box>

        {/* Avatar + Data */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'end',
            gap: 1,
            gridRow: { sm: '1 / span 2' },
            gridColumn: { xs: '1', sm: '2' },
            width:'100%'
          }}
        >
        <Box
          sx={{
            textAlign: 'center',
            width:'40%',
            alignSelf: { xs: 'flex-start', sm: 'center' },
            
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {duvida.quantidadeSolucoes || 0}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`resposta${duvida.quantidadeSolucoes === 1 ? '' : 's'}`}
          </Typography>
        </Box>
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'space-around',
            width:'60%'
          }}
          >
          <Avatar
            alt={duvida.nomeUsuario}
            src={duvida.avatarUrl}
            sx={{ width: 45, height: 45 }}
          />
          <Box
          sx={{width:'70%'}}>
            <Typography
              variant="body2"
              sx={{ color: 'primary.main', fontWeight: 500 }}
            >
              Por {duvida.nomeUsuario}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              atualizado {formatarData(duvida.criadoEm)}
            </Typography>
          </Box>
        </Box>
        </Box>

        {/* Tags */}
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            flexWrap: 'wrap',
            mt: { xs: 0, sm: 0.5 },
          }}
        >
          {duvida.tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              size="small"
              sx={{
                backgroundColor: 'grey.200',
                fontSize: '0.75rem',
              }}
              onClick={(e) => e.stopPropagation()}
            />
          ))}
        </Box>
      </Box>
    </Paper>
  ))}
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

            <Autocomplete
              multiple
              options={allTags}
              getOptionLabel={(option) => option.nome}
              value={novaDuvida.tags}
              onChange={(_, newValue) => {
                setNovaDuvida(prev => ({
                  ...prev,
                  tags: newValue
                }));
              }}
              loading={loading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Selecione as tags"
                  variant="outlined"
                  error={!!error}
                  helperText={error}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    )
                  }}
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((tag, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={tag.id}
                    label={tag.nome}
                  />
                ))
              }
              fullWidth
              sx={{ mt: 2 }}
            />

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