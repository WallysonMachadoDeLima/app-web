import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Image from 'src/components/image';

import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import Label from 'src/components/label';
import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------


type ItemProps = {
  id: string;
  classificacaoIndicativa: string;
  duracaoMinutos: number;
  generoPrincipal: string;
  titulo: string;
  urlCapa: string;
  dataEstreia: string;

};

type MovieItemProps = {
  item: ItemProps;
};

export function EmBreveMoviesItem({ item }: MovieItemProps) {
  const mdUp = useResponsive('up', 'md');

  const { classificacaoIndicativa, titulo, urlCapa, generoPrincipal, dataEstreia } = item;

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleLabel = (classificacao: number | string): [string, string] => {
    switch (classificacao) {
      case 0:
      case 6:
      case 'L':
        return ['#00a54f', 'L'];
      case 1:
      case 7:
      case '10':
        return ['#00aeef', '10'];
      case 2:
      case 8:
      case '12':
        return ['#fff101', '12'];
      case 3:
      case 9:
      case '14':
        return ['#f58220', '14'];
      case 4:
      case 10:
      case '16':
        return ['#ee1d23', '16'];
      case 'todos':
        return ['', 'Todos'];
      default:
        return ['#080500', '18'];
    }
  };

  return (
    <Grid  xs={6} sm={4}  md={2.4} xl={2} >
      <Box
      sx={{
        transition: 'transform 0.3s ease',
        transform: isHovered ? 'scale(0.95)' : 'none',
        p: 1,
      }}
    >
      <Paper
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          borderRadius: 0.8,
          position: 'relative',
          cursor: 'pointer',
          overflow: 'hidden',
          boxShadow: '5px 5px 8px rgba(0, 0, 0, 0.50)',
        }}
      >
        <Label
          variant={'filled'}
          sx={{
            width: 25,
            color: 'white',
            bgcolor: handleLabel(classificacaoIndicativa),
            position: 'absolute',
            zIndex: 10,
            top: { xs: 0, md: 3.2 },
            right: { xs: 0, md: 3 },
            transform: { xs: 'scale(0.8)', md: 'scale(0.9)' },
          }}
          translate="no"
        >
          {classificacaoIndicativa}
        </Label>
        <Image alt={`Capa do filme ${titulo}`} src={urlCapa} ratio="4/6" objectFit="fill" />
      </Paper>
      
   <Box 
    sx={{  
      fontWeight: 'bold', 
      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)',
      mt: 1,
      mb: 0.5,
      fontSize: { xs: '0.7rem', md: '1rem' },
      justifyContent: 'center',
      display: 'flex',
    }}>
      <Label color='default' width={'100%'}>  
     <Typography  variant={mdUp ? 'subtitle1' : 'subtitle2'} sx={{
       color:'white',
       display: 'inline-block',
       whiteSpace: 'nowrap',
       overflow: 'hidden',
       textOverflow: 'ellipsis',
     }}>
     {dataEstreia}
     </Typography>
      </Label>
    </Box>

     
    </Box>
    </Grid>
  );
}
