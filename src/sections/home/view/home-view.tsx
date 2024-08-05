'use client';

import { useScroll } from 'framer-motion';
import Box from '@mui/material/Box';
import MainLayout from 'src/layouts/main';
import HomeBanner from '../home-banner';
import HomeMoviePoster from '../home-movie-poster';
import ScrollProgress from 'src/components/scroll-progress';
import HomeMovieShortly from '../home-movie-shortly';
import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

export default function HomeView() {
  const { scrollYProgress } = useScroll();
  const mdUp = useResponsive('up', 'md');

  return (
    <MainLayout>
      <ScrollProgress scrollYProgress={scrollYProgress} />

      <HomeBanner />

      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        <HomeMoviePoster />

        <Box sx={{ position: 'relative', bgcolor: '#5c666f', mt: { xs: -2, md: 2 }, m: 0 }}>
          <HomeMovieShortly />
        </Box>
      </Box>
    </MainLayout>
  );
}
