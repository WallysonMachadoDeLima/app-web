import Paper from '@mui/material/Paper';
import Box, { BoxProps } from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import Image from 'src/components/image';
import Typography from '@mui/material/Typography';

import Carousel, { CarouselArrows, useCarousel } from 'src/components/carousel';

import { useResponsive } from 'src/hooks/use-responsive';
import { useState } from 'react';
import Label from 'src/components/label';

// ----------------------------------------------------------------------

type ItemProps = {
  id: string;
  classificacaoIndicativa: string;
  duracaoMinutos: number;
  generoPrincipal: string;
  titulo: string;
  urlCapa: string;
};

interface Props extends BoxProps {
  list: ItemProps[];
}

export default function MoviesPosterFeatured({ list }: Props) {
  const mdUp = useResponsive('up', 'md');

  const carousel = useCarousel({
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3900,

    slidesToShow: 5,
    centerMode: true,
    centerPadding: '180px',
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2, centerPadding: '90px' },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2, centerPadding: '60px' },
      },
    ],
  });

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      {mdUp && (
        <CardHeader
          action={<CarouselArrows onNext={carousel.onNext} onPrev={carousel.onPrev} />}
          sx={{
            p: 0,
            mb: 3,
            mr: 5,
          }}
        />
      )}
      <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings} swipeToSlide>
        {list.map((item) => (
          <MoviesPosterItem key={item.id} item={item} />
        ))}
      </Carousel>
    </Box>
  );
}

// ----------------------------------------------------------------------

type MovieItemProps = {
  item: ItemProps;
};

function MoviesPosterItem({ item }: MovieItemProps) {
  const { classificacaoIndicativa, titulo, urlCapa } = item;

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

      <Typography
        sx={{
          mt: 1,
          mb: 0.5,
          fontSize: { xs: '0.7rem', md: '1rem' },
          textAlign: 'center',
          fontWeight: 'bold',
          textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)',
        }}
      >
        {titulo}
      </Typography>
    </Box>
  );
}
