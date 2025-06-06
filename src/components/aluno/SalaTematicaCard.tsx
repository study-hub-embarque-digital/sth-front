import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { ISalaTematica } from "../../pages/room/detail/sala-tematica/ListagemSalaTematica";

interface ISalaTematicaCard {
  salaTematica: ISalaTematica,
  image?: string
}

const SalaTematicaCard = ({ salaTematica, image }: ISalaTematicaCard) => {
  return (
    <Card sx={{ width: 429, height: 246, backgroundColor: '#FFF', marginRight: 2, flexShrink: 0 }}>
      {image ? (
        <img
          src={image}
          alt={salaTematica.salaTematicaId}
          style={{ height: 173, width: '100%', objectFit: 'cover' }}
        />
      ) : (
        <div
          style={{
            height: 173,
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