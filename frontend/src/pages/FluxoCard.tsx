import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import { useNavigate } from 'react-router-dom';

export default function FluxoCard({ pedidoId, title, state, date, pending, delay, verification }) { 
  const [expanded, setExpanded] = React.useState(false); 
  const navigate = useNavigate();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleViewTimeline = () => {
    // Redireciona para a página Timeline com o ID do pedido na URL
    navigate(`/timeline/${pedidoId}`);
  };

  return (
    <div>
      <Card sx={{
        width: 'auto',
        backgroundColor: 'rgba(0, 58, 102, 0.671)',
        color: 'white',
        borderRadius: '10px',
        marginBottom: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" sx={{ color: 'white' }} onClick={handleViewTimeline}>
            Visualizar
          </Button>
        </CardActions>
      </Card>
      
      {expanded && (
        <Card sx={{
          width: 'auto',
          backgroundColor: '#2D6624',
          color: 'white',
          borderRadius: '10px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          marginTop: '8px',
        }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {title}
            </Typography>

            {delay > 0 && (
              <Typography variant="body2" component="p" sx={{ color: 'red', marginBottom: 2 }}>
                <br />
                ⚠️ Atenção: Há um atraso nas etapas!
              </Typography>
            )}

            <Typography variant="body1" component="p">
              <br />
              <strong>Estado:</strong> {state}<br />
              <strong>Dias para entrega:</strong> {date}<br />
              <strong>Etapas pendentes:</strong> {pending}<br />
              <strong>Etapas em atraso:</strong> {delay}<br />
              <strong>Pedidos de verificação:</strong> {verification}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center', width: '100%' }}>
            <Button size="large" sx={{ color: 'white' }} onClick={handleExpandClick}>
              Fechar
            </Button>
          </CardActions>
        </Card>
      )}
    </div>
  );
}
