import { m } from 'framer-motion';

import { Card, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { MotionContainer, varFade } from 'src/components/animate';
import { useResponsive } from 'src/hooks/use-responsive';
import { MoviesService, MoviesShortlyService } from 'src/services';
import { useUnidade } from 'src/store/unidade';
import { EmBreveMoviesItem } from './components/em-breve-movies-item';

// ----------------------------------------------------------------------

const PAPER_STYLE = {
  borderRadius: 2,
  position: 'relative',
  cursor: 'pointer',
  overflow: 'hidden',
  boxShadow: '5px 5px 8px rgba(0, 0, 0, 0.50)',
};

const STYLES_CARD = {
  borderRadius: {xs: 1, md: 1.5},
  width: '100%',
  cursor: 'pointer',
  textAlign: 'center',
};

const MOTHES = [
  'JANEIRO',
  'FEVEREIRO',
  'MARÇO',
  'ABRIL',
  'MAIO',
  'JUNHO',
  'JULHO',
  'AGOSTO',
  'SETEMBRO',
  'OUTUBRO',
  'NOVEMBRO',
  'DEZEMBRO',
];

// ----------------------------------------------------------------------

export default function Precos() {
  const { state } = useUnidade();
  const { enqueueSnackbar } = useSnackbar();

  const mdUp = useResponsive('up', 'md');

  const [movies, setMovies] = useState<any[]>([]);

  const reordenarMovies = (filmes: any[]) => {
    const replaceDate = (date: string) => date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1');  
    const parseDate = (date: string) => new Date(replaceDate(date)).getTime();
    const getMonthYear = (date: string) => {
        const [_, month, year] = date.split('/');
        return `${MOTHES[parseInt(month)-1]} | ${year}`;
    };
    
    const monthYear = (date: string) => {
        const [_, month, year] = date.split('/');
        return {
          month: MOTHES[parseInt(month) - 1],
          year: year,
        }
    };

    // Ordena os filmes por data
    const moviesReordered = filmes.sort((a, b) => parseDate(a.dataEstreia) - parseDate(b.dataEstreia));

    // Array para armazenar os filmes com os meses
    const result: any = [];
    let lastMonthYear = '';

    // Itera sobre os filmes reordenados e adiciona o mês quando necessário
    moviesReordered.forEach(filme => {
        const currentMonthYear = getMonthYear(filme.dataEstreia);
        if (currentMonthYear !== lastMonthYear) {
            result.push(monthYear(filme.dataEstreia));
            lastMonthYear = currentMonthYear;
        }
        result.push(filme);
    });

    return result;
};

  const renderTitle = (
    <Stack
      spacing={3}
      sx={{
        mb: { xs: 2, md: 0 },
        mt: { xs: 0, md: 0 },
        ml: { xs: '7%', md: '10%' },
        pt: { xs: 8, md: 10 },
      }}
    >
      <m.div variants={varFade().inUp}>
        <Typography
          component="div"
          variant="overline"
          sx={{
            fontSize: { xs: '0.6rem', md: '1.1rem' },
          }}
        >
          #EMBREVE
        </Typography>
        <Typography
          variant="h2"
          component="div"
          color="primary.main"
          sx={{ fontSize: { xs: '1.3rem', md: '2.5rem' } }}
        >
          EM BREVE
        </Typography>
        <Typography
          component="div"
          variant="overline"
          sx={{
            fontSize: { xs: '0.6rem', md: '1.1rem' },
          }}
        >
          {(state.unidade.nome || 'Unidade não selecionada').toUpperCase()}
        </Typography>
      </m.div>
    </Stack>
  );

  useEffect(() => {
    MoviesShortlyService.index(state.unidade.id)
    .then(async (responseMovieShortly) => {
      let data: any[] = [];
      await Promise.all(responseMovieShortly.map(async (item: any) => {
        const responseMovie = await MoviesService.show(item.id);
        const findMovieShortly = responseMovieShortly.find((itemFind: any) => itemFind.id === item.id);
        data.push({
          ...responseMovie,
          ...findMovieShortly,
        });
      }));
      setMovies(data);
    })
    .catch(() => {
      enqueueSnackbar('Lista de filmes não Encontrada', {
        variant: 'error',
      });
    });
  }, [state.unidade.id]);

  return (
    <>
      <MotionContainer action animate={true}>
        {renderTitle}

        <Stack spacing={3} direction="column" sx={{ mx: { xs: '7%', md: '10%' }, mt: 7, mb: 7 }}>
        <Grid container  spacing={2}>
          
        {reordenarMovies(movies).map((item: any) => {
          if (item.month) {
            return (
              <Grid xs={12} key={item.month}>
                <Card sx={{
                  ...STYLES_CARD,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
                   }}>
                <Typography variant="h6" color="primary.main" sx={{ fontSize: { xs: '1.5rem', md: '2.3rem' }}}
                >
                  {item.month}
                </Typography>&nbsp;
                <Typography variant="h6"   sx={{ fontSize: { xs: '1.5rem', md: '2.3rem' }}}
                >
                  / {item.year}
                </Typography>
                </Card>
              </Grid>
            );
          }
          return (
            <EmBreveMoviesItem key={item.id} item={item} />
          );
        })}


        </Grid>
        </Stack>
      </MotionContainer>
    </>
  );
}
