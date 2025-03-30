import { useEffect, useState } from "react";
import { getDuvidas } from "../../../services/ForumService"; 
import { Paper, Typography, Chip, Container, CircularProgress, Stack, Box} from "@mui/material";
import { useNavigate } from 'react-router-dom';

export default function ForumPage() {
  const [duvidas, setDuvidas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
<Container sx={{ padding: 0, margin: 0, display: 'flex', flexDirection: 'column',minHeight: '100vh' }}>
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
</Container>
  );
}