'use client';

import { useScroll } from 'framer-motion';
import MainLayout from 'src/layouts/main';
import ScrollProgress from 'src/components/scroll-progress';
import EmBreve from '../em-breve';

// ----------------------------------------------------------------------

export default function EmBreveView() {
  const { scrollYProgress } = useScroll();

  return (
    <MainLayout>
      <ScrollProgress scrollYProgress={scrollYProgress} />
      <EmBreve />
    </MainLayout>
  );
}
