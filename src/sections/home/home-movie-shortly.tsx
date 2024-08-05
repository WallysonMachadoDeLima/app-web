import { m } from 'framer-motion';

import { useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// theme
import { textGradient, bgGradient } from 'src/theme/css';
// routes
import { paths } from 'src/routes/paths';
// components
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';
import MoviesShortlyFeatured from './home-movie-shortly-featured';
import { useEffect, useState } from 'react';
import { MoviesPosterService, MoviesShortlyService } from 'src/services';
import { useSnackbar } from 'notistack';
import { getLocalItem } from 'src/utils/storage';
import { useUnidade } from 'src/store/unidade';
import { useSettingsContext } from 'src/components/settings';

// ----------------------------------------------------------------------

export default function HomeMovieShortly() {
  const theme = useTheme();
  const settings = useSettingsContext();
  const isWidth = getLocalItem('isMinDesktop');

  const { enqueueSnackbar } = useSnackbar();
  const { state } = useUnidade();

  const [movies, setMovies] = useState([]);

  const upMd = useResponsive('up', 'md');

  const renderDescription = (
    <Box
      sx={{
        textAlign: { xs: 'center', md: 'unset' },
        mt: { xs: 6, md: 10 },
        mb: { xs: -3, md: 0 },
      }}
    >
      <m.div variants={varFade().inDown}>
        <Typography
          component="div"
          variant="overline"
          sx={{
            fontSize: { xs: '0.6rem', md: isWidth ? '0.9rem' : '1rem' },
            color: 'text.disabled',
            mb: { xs: 2.5, md: 1.5 },
          }}
        >
          #EMBREVE
        </Typography>
        <Typography
          variant="h2"
          component="div"
          sx={{
            fontSize: { xs: '1.3rem', md: isWidth ? '2.8rem' : '2.5rem' },
            mt: -3,
            mb: { xs: 2.5, md: 1.5 },
            textShadow: { xs: '', md: '2px 2px 8px rgba(0, 0, 0, 0.60)' },
            color: { xs: settings.themeMode == 'dark' ? '#ffffff' : '#000000', md: '#ffffff' },
          }}
        >
          EM BREVE NOS
        </Typography>
        <Typography
          variant="h2"
          component="div"
          color="primary.main"
          sx={{
            fontSize: { xs: '1.3rem', md: isWidth ? '4.5rem' : '4rem' },
            mt: -3,
            textShadow: { xs: '', md: '2px 2px 8px rgba(0, 0, 0, 0.60)' },
          }}
        >
          CINEMAS
        </Typography>
        <Typography
          component="div"
          variant="body2"
          sx={{
            fontSize: { xs: '0', md: '1rem' },
          }}
        >
          Acompanhe as próximas grandes estréias nas telonas
        </Typography>
      </m.div>
    </Box>
  );

  useEffect(() => {
    MoviesShortlyService.index(state.unidade.id)
      .then((response) => {
        setMovies(response);
      })
      .catch(() => {
        enqueueSnackbar('Lista de filmes não Encontrada', {
          variant: 'error',
        });
      });
  }, [state.unidade.id]);

  return (
    <Box
      sx={{
        minHeight: { xs: 400, md: 500 },
        overflow: 'hidden',
        position: 'relative',
        ...bgGradient({
          startColor: `${settings.themeMode == 'dark' ? theme.palette.grey[900] : '#ffffff'} 5%`,

          endColor: alpha(theme.palette.grey[300], 0),
          imgUrl: `/assets/background/overlay_${!upMd ? '4.jpg' : '5.png'}`,
        }),
      }}
    >
      <Grid container sx={{ mt: { xs: 0, md: 7 } }}>
        <Grid xs={12} md={3}>
          <Container component={MotionViewport}>{renderDescription}</Container>
        </Grid>

        <Grid xs={12} md={9}>
          {<MoviesShortlyFeatured list={movies} />}
        </Grid>
      </Grid>
    </Box>
  );
}
