import { m, useScroll } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';

import { styled, alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
// routes
import { paths } from 'src/routes/paths';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// theme
import { secondaryFont } from 'src/theme/typography';
import { textGradient, bgGradient, bgBlur } from 'src/theme/css';
// layouts
import { HEADER } from 'src/layouts/config-layout';
// components
import { RouterLink } from 'src/routes/components';
import { MotionContainer, varFade } from 'src/components/animate';
import Iconify from 'src/components/iconify';
import BannerFeatured from './home-banner-featured';

import { useSnackbar } from 'notistack';
import { BannerService, UnidadeServices } from 'src/services';
import { IBanner } from 'src/types/banner';
import { getLocalItem } from 'src/utils/storage';
import { useUnidade } from 'src/store/unidade';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.94),
    imgUrl: '/assets/background/overlay_3.jpg',
  }),
  width: '100%',
  height: '30.3vh',
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    height: '100vh',
    top: 0,
    left: 0,
    position: 'fixed',
  },
}));

const StyledWrapper = styled('div')(({ theme }) => ({
  height: '100%',
  overflow: 'hidden',
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    marginTop: HEADER.H_DESKTOP_OFFSET,
  },
}));

type StyledPolygonProps = {
  opacity?: number;
  anchor?: 'left' | 'right';
};

const StyledPolygon = styled('div')<StyledPolygonProps>(
  ({ opacity = 1, anchor = 'left', theme }) => ({
    ...bgBlur({
      opacity,
      color: theme.palette.background.default,
    }),
    zIndex: 9,
    bottom: '8vh',
    height: getLocalItem('isWidthInRange') ? 60 : 80,
    width: '50%',
    position: 'absolute',
    clipPath: 'polygon(0% 0%, 100% 100%, 0% 100%)',
    ...(anchor === 'left' && {
      left: 0,
      ...(theme.direction === 'rtl' && {
        transform: 'scale(-1, 1)',
      }),
    }),
    ...(anchor === 'right' && {
      right: 0,
      transform: 'scaleX(-1)',
      ...(theme.direction === 'rtl' && {
        transform: 'scaleX(1)',
      }),
    }),
  })
);

// ----------------------------------------------------------------------

export default function HomeBanner() {
  const mdUp = useResponsive('up', 'md');
  const { state } = useUnidade();

  const { scrollY } = useScroll();
  const { enqueueSnackbar } = useSnackbar();

  const heroRef = useRef<HTMLDivElement | null>(null);

  const [percent, setPercent] = useState(10);

  const opacity = 1 - percent / 100;
  const hide = percent > 120;

  const getScroll = useCallback(() => {
    let heroHeight = 0;

    if (heroRef.current) {
      heroHeight = heroRef.current.offsetHeight;
    }

    scrollY.on('change', (scrollHeight) => {
      const scrollPercent = (scrollHeight * 100) / heroHeight;

      setPercent(Math.floor(scrollPercent) > 10 ? Math.floor(scrollPercent) : 10);
    });
  }, [scrollY]);

  useEffect(() => {
    getScroll();
  }, [getScroll]);

  const renderPolygons = (
    <>
      <StyledPolygon opacity={0.48} />
      <StyledPolygon opacity={0.48} sx={{ height: 48, zIndex: 10 }} />
      <StyledPolygon sx={{ zIndex: 11, height: 24 }} />
      <StyledPolygon anchor="right" opacity={0.48} />
      <StyledPolygon anchor="right" opacity={0.48} sx={{ height: 48, zIndex: 10 }} />
      <StyledPolygon anchor="right" sx={{ zIndex: 11, height: 24 }} />
    </>
  );

  const [banners, setBanners] = useState<IBanner[]>([]);

  useEffect(() => {
    BannerService.index(state.unidade.id)
      .then((response) => {
        setBanners(response);
      })
      .catch(() => {
        enqueueSnackbar('Erro ao listar banners', {
          variant: 'error',
        });
      });
  }, [state.unidade.id]);

  return (
    <>
      <StyledRoot
        ref={heroRef}
        sx={{
          ...(hide && {
            opacity: 0,
          }),
        }}
      >
        <StyledWrapper>
          <Container component={MotionContainer} sx={{ height: 1 }}>
            <Grid container sx={{ height: 1, justifyContent: 'center' }}>
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                  height: 1,
                  mx: 'auto',
                  opacity: opacity > 0 ? opacity : 0,
                  mt: {
                    xs: `-${HEADER.H_MOBILE - 50}px`,
                    md: `-${HEADER.H_DESKTOP + percent * 2.5}px`,
                  },
                  position: 'relative',
                }}
              >
                <BannerFeatured list={banners} />
              </Stack>
            </Grid>
          </Container>
        </StyledWrapper>
      </StyledRoot>
      {mdUp && renderPolygons}
      <Box sx={{ height: { md: '80vh', lg: '92vh' } }} />
    </>
  );
}
