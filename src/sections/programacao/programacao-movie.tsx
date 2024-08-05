import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
// routes
// hooks
// theme
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
// layouts
import Image from 'src/components/image';
import { HEADER } from 'src/layouts/config-layout';
// components
import { Divider, Paper } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import { useSnackbar } from 'notistack';
import { MotionContainer } from 'src/components/animate';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import { RouterLink } from 'src/routes/components';
import { MoviesService } from 'src/services';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useBoolean } from 'src/hooks/use-boolean';
import { ProgramacaoFilters } from './components';

// ----------------------------------------------------------------------

const PAPER_STYLE = {
  borderRadius: 2,
  position: 'relative',
  cursor: 'pointer',
  overflow: 'hidden',
  boxShadow: '5px 5px 8px rgba(0, 0, 0, 0.50)',
};

// ----------------------------------------------------------------------

type ItemProps = {
  id: string;
  classificacaoIndicativa: string;
  duracaoMinutos: number;
  generoPrincipal: string;
  titulo: string;
  urlCapa: string;
  paisOrigem: string;
  ano: string;
  direcao: string;
  elenco: string;
  sinopse: string;
  trailerLink: string;
  pais: {
    nomeIso: string;
  };
  sessions: {
    unidade: number;
    codigo: number;
    data: string;
    hora: string;
    tipoProjecao: string;
    legendado: boolean;
    audio: string;
    sessaoAzul: boolean;
    resolucao4k: boolean;
    atmos: boolean;
  }[];
};

interface PropsFilters {
  date: string;
  dateFull: string;
  dayWeek: string;
  language: string;
  projection: string;
}

export default function ProgramacaoMovie() {
  const dialog = useBoolean();

  const { enqueueSnackbar } = useSnackbar();

  const [movies, setMovies] = useState<[]>([]);
  const [moviesFilter, setMoviesFilter] = useState<[]>([]);
  const [idMovie, setIdMovie] = useState<string>();
  const [currentMovie, setCurrentMovie] = useState<ItemProps>();
  const [filter, setFilter] = useState<PropsFilters>({} as PropsFilters);

  const userAgent =
    typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent,
    );

  const renderDialog = (item: ItemProps) => {
    return (
      <Dialog
        open={dialog.value}
        onClose={dialog.onFalse}
        maxWidth={'md'}
        fullWidth={true}
      >
        <AppBar position="relative" color="default">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography
              component="div"
              variant="overline"
              sx={{
                fontSize: { xs: '0.6rem', md: '1.1rem' },
                color: 'text.disabled',
              }}
            >
              #TRAILER
            </Typography>
            <IconButton color="inherit" edge="start" onClick={dialog.onFalse}>
              <Iconify icon="mingcute:close-line" />
            </IconButton>
          </Toolbar>
        </AppBar>

        <DialogContent>
          <Grid container>
            <Grid xs={3}>
              <Paper
                sx={{
                  ...PAPER_STYLE,
                  width: { xs: 170, md: 180 },
                  height: { xs: 240, md: 260 },
                }}
              >
                <Image
                  alt={`Capa do filme ${item?.titulo}`}
                  src={item?.urlCapa}
                  sx={{
                    width: '100%',
                    height: '100%',
                  }}
                  objectFit="fill"
                />
              </Paper>
            </Grid>
            <Grid xs={9}>
              <Stack
                direction="column"
                justifyContent="start"
                alignItems="start"
                spacing={2}
              >
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {item.titulo}
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="start"
                  alignItems="start"
                  spacing={2}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {item.duracaoMinutos > 0
                      ? `${item.duracaoMinutos} minutos`
                      : 'Tempo não informado'}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {item.generoPrincipal}
                  </Typography>
                  <Label
                    variant={'filled'}
                    sx={{
                      width: 28,
                      height: 28,
                      fontSize: { xs: '0.6rem', md: '1rem' },
                      color: 'white',
                      bgcolor: handleLabel(item.classificacaoIndicativa),
                    }}
                    translate="no"
                  >
                    {item.classificacaoIndicativa}
                  </Label>
                </Stack>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {item.paisOrigem} {item.ano}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Diretor: {item.direcao}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Elenco: {item.elenco}
                </Typography>
              </Stack>
            </Grid>
            <Grid xs={12}></Grid>
          </Grid>
          <Divider sx={{ height: '1px', my: 3 }} />
          <Stack
            direction="column"
            justifyContent="start"
            alignItems="start"
            spacing={2}
          >
            <iframe
              width="100%"
              height="480"
              src={item.trailerLink}
              title={item.titulo}
            />
          </Stack>
          <Divider sx={{ height: '1px', my: 3 }} />
          <Stack
            direction="column"
            justifyContent="start"
            alignItems="start"
            spacing={2}
            mb={3}
          >
            <Typography variant="subtitle1" sx={{ textAlign: 'justify' }}>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    (item.sinopse === '<p>ainda sem sinopse.</p>' &&
                      'Sinopse não foi informada') ||
                    item.sinopse,
                }}
              />
            </Typography>
          </Stack>
        </DialogContent>
      </Dialog>
    );
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

  useEffect(() => {
    if (idMovie) {
      MoviesService.show(idMovie)
        .then((response) => {
          setCurrentMovie(response);
        })
        .catch(() => {
          enqueueSnackbar('Erro ao obter informações do filme', {
            variant: 'error',
          });
        });
    }
  }, [idMovie]);

  return (
    <>
      {currentMovie && renderDialog(currentMovie)}
      <MotionContainer action animate={true}>
        <ProgramacaoFilters
          filter={filter}
          setFilter={setFilter}
          movies={movies}
          setMoviesFilter={setMoviesFilter}
          setMovies={setMovies}
        />

        <Divider sx={{ height: '1px', mx: 10, my: 3, mb: -10 }} />

        <Grid container>
          <Grid xs={12} height={HEADER.H_DESKTOP + 60} />
          {moviesFilter.map((item: ItemProps, index: number) => {
            return (
              <>
                <Grid xs={3.5}>
                  <Paper
                    sx={{
                      ...PAPER_STYLE,
                      width: '55%',
                      ml: { xs: 0, md: '11vw' },
                    }}
                  >
                    <Image
                      alt={`Capa do filme ${item?.titulo}`}
                      src={item?.urlCapa}
                      objectFit="fill"
                      ratio="4/6"
                    />
                  </Paper>
                </Grid>
                <Grid xs={4}>
                  <Stack
                    direction="column"
                    justifyContent="start"
                    alignItems="start"
                    spacing={2}
                  >
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      {item.titulo}
                    </Typography>
                    <Stack
                      direction="row"
                      justifyContent="start"
                      alignItems="start"
                      spacing={2}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Classificação Indicativa:
                      </Typography>

                      <Label
                        variant={'filled'}
                        sx={{
                          width: 28,
                          height: 28,
                          fontSize: { xs: '0.6rem', md: '1rem' },
                          color: 'white',
                          bgcolor: handleLabel(item.classificacaoIndicativa),
                        }}
                        translate="no"
                      >
                        {item.classificacaoIndicativa}
                      </Label>
                    </Stack>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      Tempo:{' '}
                      {item.duracaoMinutos > 0
                        ? `${item.duracaoMinutos} minutos`
                        : 'Não informado'}
                    </Typography>

                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      Gênero: {item.generoPrincipal}
                    </Typography>

                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      País: {item.pais?.nomeIso}
                    </Typography>

                    <Stack
                      direction="column"
                      justifyContent="start"
                      alignItems="start"
                      spacing={2}
                      width={'35%'}
                      mt={5}
                    >
                      <Button
                        component={RouterLink}
                        href={`https://jiparana.lasercinemas.com.br/auth/login?filme=${item.id}&mobile=${isMobile}`}
                        variant="contained"
                        sx={{
                          mr: 1,
                          size: { xs: 'medium', md: 'small' },
                          height: { xs: 'auto', md: 35 },
                        }}
                        color="primary"
                        fullWidth
                      >
                        Comprar Ingresso
                      </Button>

                      <Button
                        variant="contained"
                        sx={{
                          mr: 1,
                          size: { xs: 'medium', md: 'small' },
                          height: { xs: 'auto', md: 35 },
                        }}
                        fullWidth
                        onClick={() => {
                          setIdMovie(item.id);
                          dialog.onTrue();
                        }}
                      >
                        Informações / Trailer
                      </Button>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid xs={3} md={3.5}>
                  {item.sessions.length === 0 && (
                    <Stack
                      direction="column"
                      justifyContent="center"
                      alignItems="start"
                    >
                      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        Não há sessões disponíveis 😔
                      </Typography>
                    </Stack>
                  )}

                  {item.sessions.length > 0 && (
                    <Box
                      rowGap={3}
                      display="grid"
                      gridTemplateColumns={{
                        xs: 'repeat(1, 1fr)',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)',
                        xl: 'repeat(4, 1fr)',
                      }}
                    >
                      {item.sessions.map((session) => (
                        <Button
                          style={{
                            backgroundColor: 'red',
                            color: 'white',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            gap: 5,
                            width: 110,
                            height: 70,
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              gap: 5,
                              marginTop: 7,
                            }}
                          >
                            <Typography
                              sx={{
                                color: 'white',
                                fontWeight: 'bold',
                                border: '1px solid white',
                                px: 0.5,
                                borderRadius: '5px',
                              }}
                            >
                              {session.legendado ? 'LEG' : 'DUB'}
                            </Typography>
                            <Typography
                              sx={{
                                color: 'white',
                                fontWeight: 'bold',
                                border: '1px solid white',
                                px: 0.5,
                                borderRadius: '5px',
                              }}
                            >
                              {session.tipoProjecao}
                            </Typography>
                          </div>

                          <Typography
                            sx={{ color: 'white', fontWeight: 'bold' }}
                          >
                            {session.hora.substring(0, 5)}
                          </Typography>
                        </Button>
                      ))}
                    </Box>
                  )}
                </Grid>
                <Grid xs={12}>
                  {index !== movies.length - 1 && (
                    <Divider
                      sx={{
                        height: '1px',
                        mx: 5,
                        my: 7,
                      }}
                    />
                  )}
                </Grid>
              </>
            );
          })}
        </Grid>
      </MotionContainer>
    </>
  );
}
