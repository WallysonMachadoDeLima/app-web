'use client';
import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { MotionViewport, varFade } from 'src/components/animate';
import { useEffect, useState } from 'react';
import MoviesPosterFeatured from './home-movie-poster-featured';
import { MoviesPosterService } from 'src/services';
import { useSnackbar } from 'notistack';
import { useUnidade } from 'src/store/unidade';
import localFont from 'next/font/local';
import { Poppins } from 'next/font/google';

// ----------------------------------------------------------------------

export default function HomeMoviePoster() {
  const { enqueueSnackbar } = useSnackbar();
  const { state } = useUnidade();

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    MoviesPosterService.index(state.unidade.id)
      .then((response) => {
        console.log(response);
        setMovies(response);
      })
      .catch(() => {
        enqueueSnackbar('Erro ao listar filmes', {
          variant: 'error',
        });
      });
  }, [state.unidade.id]);

  return (
    <>
      <Container
        component={MotionViewport}
        sx={{
          pt: { xs: 5, md: 15 },
        }}
      >
        <Stack
          spacing={3}
          sx={{
            textAlign: 'center',
            mb: { xs: 2, md: 0 },
            mt: { xs: 0, md: -10 },
          }}
        >
          <m.div variants={varFade().inUp}>
            <Typography
              component="div"
              variant="overline"
              sx={{ fontSize: { xs: '0.6rem', md: '1.1rem' }, color: 'text.disabled' }}
            >
              #HojeNosCinemas
            </Typography>
          </m.div>
          <m.div variants={varFade().inDown}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography
                variant="h2"
                component="div"
                sx={{ fontSize: { xs: '1.3rem', md: '2.5rem' }, mt: -3 }}
              >
                FILMES EM
              </Typography>
              <Typography
                variant="h2"
                component="div"
                color="primary.main"
                sx={{ ml: 1, fontSize: { xs: '1.3rem', md: '2.5rem' }, mt: -3 }}
              >
                CARTAZ
              </Typography>
            </Box>
          </m.div>
        </Stack>
      </Container>
      <MoviesPosterFeatured list={movies} />
    </>
  );
}
