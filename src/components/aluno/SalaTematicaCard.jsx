import { Card, CardContent, Typography } from "@mui/material";

const SalaTematicaCard = ({ salaTematica }) => {
  return (
    <Card sx={{ width: 150, backgroundColor: '#FFD700', marginRight: 2, flexShrink: 0 }}>
      {salaTematica.image ? (
        <img
          src={salaTematica.image}
          alt={salaTematica.salaTematicaId}
          style={{ height: 100, width: '100%', objectFit: 'cover' }}
        />
      ) : (
        <div
          style={{
            height: 100,
            width: '100%',
            backgroundColor: '#ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="body2" sx={{ color: '#666' }}>
            Sem imagem
          </Typography>
        </div>
      )}
      
      <CardContent>
        <Typography
          variant="body1"
          sx={{ fontWeight: 'bold', textAlign: 'center' }}
        >
          {salaTematica.nome || 'salaTematica'}
        </Typography>
      </CardContent>
    </Card>
  );
}

export { SalaTematicaCard };