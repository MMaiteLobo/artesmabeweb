import { List, ListItem, ListItemText, Typography, Box } from '@mui/material';
import { listStyles } from '../../styles/common';

function CharacteristicsList({ characteristics }) { /*Recibe un objeto characteristics donde cada propiedad representa una par clave-valor. Ejemplo: { color: 'rojo', tamaño: 'grande' }*/
  return (
    <List> 
      {Object.entries(characteristics).map(([key, value]) => ( /*Convierte el objeto en un array de pares clave-valor para poder mapearlo. Ejemplo: [['color', 'rojo'], ['tamaño', 'grande']]*/
        <ListItem key={key} sx={listStyles.item}> 
          <ListItemText
            primary={
              <Box sx={listStyles.text}>
                <Typography variant="body2" sx={{ 
                  fontWeight: 'medium',
                  color: 'text.secondary'
                }}>
                  {key}:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {value}
                </Typography>
              </Box>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}

export default CharacteristicsList; 