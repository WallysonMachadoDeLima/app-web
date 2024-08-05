'use client';

import { useScroll } from 'framer-motion';
import Card, { CardProps } from '@mui/material/Card';
import Image from 'src/components/image';
import { MotionContainer } from 'src/components/animate';
import Carousel, { CarouselDots, CarouselArrows, useCarousel } from 'src/components/carousel';
import { Box } from '@mui/material';
import { IBanner } from 'src/types/banner';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getLocalItem } from 'src/utils/storage';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  list: IBanner[];
}

export default function AppFeatured({ list, ...other }: Props) {
  const { scrollY } = useScroll();
  const isMinDesktop = getLocalItem('isMinDesktop');
  const heroRef = useRef<HTMLDivElement | null>(null);

  const [_, setPercent] = useState(10);

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

  const carousel = useCarousel({
    infinite: true,
    speed: 1500,
    autoplay: true,
    autoplaySpeed: 8000,
    ...CarouselDots({
      sx: {
        display: { xs: 'none', md: 'flex' },
        top: { xs: '5px', md: '12px' },
        left: { xs: '0px', sm: '-5px' },
        position: 'absolute',
        color: 'primary.light',
        ml: { xs: 0, md: 3 },
        mr: { xs: 0, md: 3 },
      },
    }),
  });

  return (
    <Card
      {...other}
      sx={{
        position: 'absolute',
        top: { xs: '85px', md: '145px', lg: `${isMinDesktop ? '150' : '135'}px` },

        width: { xs: '100vw', md: '97vw' },
        height: { xs: 'auto', lg: '65vh' },
        ml: -50,
        mr: -50,

        borderRadius: { xs: 0.8, lg: 1.5 },
      }}
    >
      <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
        {list.map((app, index) => (
          <CarouselItem key={app.bannerId} item={app} active={index === carousel.currentIndex} />
        ))}
      </Carousel>

      <CarouselArrows
        onNext={carousel.onNext}
        onPrev={carousel.onPrev}
        sx={{
          top: { xs: 1, sm: 4, md: 8 },
          right: { xs: 1, sm: 4, md: 8 },
          position: 'absolute',
          color: 'common.white',
        }}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

type CarouselItemProps = {
  item: IBanner;
  active?: boolean;
};

function CarouselItem({ item, active }: CarouselItemProps) {
  const { url, titulo } = item;

  const renderImg = (
    <Box sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <Image
        alt={titulo}
        src={url}
        sx={{
          width: '100%',
          height: { xs: '22vh', sm: 'auto', lg: '65vh' },
        }}
        objectFit="fill"
      />
    </Box>
  );

  return (
    <MotionContainer action animate={active}>
      <div>{renderImg}</div>
    </MotionContainer>
  );
}
