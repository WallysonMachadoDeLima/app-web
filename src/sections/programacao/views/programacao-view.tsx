'use client';

import { useScroll } from 'framer-motion';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
// layouts
import MainLayout from 'src/layouts/main';
// components
//
import ScrollProgress from 'src/components/scroll-progress';
import { useResponsive } from 'src/hooks/use-responsive';

import { alpha } from '@mui/material/styles';
import { bgGradient } from 'src/theme/css';
import ProgramacaoMovie from '../programacao-movie';
// ----------------------------------------------------------------------

export default function ProgramacaoView() {
  const { scrollYProgress } = useScroll();
  const mdUp = useResponsive('up', 'md');

  return (
    <MainLayout>
      <ScrollProgress scrollYProgress={scrollYProgress} />
      <ProgramacaoMovie />
    </MainLayout>
  );
}
