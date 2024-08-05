'use client';

import { useScroll } from 'framer-motion';
import MainLayout from 'src/layouts/main';
import ScrollProgress from 'src/components/scroll-progress';
import Precos from '../precos-ingressos-produtos';

// ----------------------------------------------------------------------

export default function PrecosView() {
  const { scrollYProgress } = useScroll();

  return (
    <MainLayout>
      <ScrollProgress scrollYProgress={scrollYProgress} />
      <Precos />
    </MainLayout>
  );
}
