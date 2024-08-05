import { Button, Card, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useResponsive } from 'src/hooks/use-responsive';
import { HEADER } from 'src/layouts/config-layout';
import { MoviesPosterService } from 'src/services';
import { useUnidade } from 'src/store/unidade';
import { bgBlur } from 'src/theme/css';
import { getSessionItem, setSessionItem } from 'src/utils/storage';
import { PROGRAMACAO_ENUMS } from '../enums';

// ----------------------------------------------------------------------

interface PropsFilters {
  date: string;
  dateFull: string;
  dayWeek: string;
  language: string;
  projection: string;
}

interface Props {
  filter: PropsFilters;
  setFilter: (value: PropsFilters) => void;
  movies: [];
  setMoviesFilter: (value: []) => void;
  setMovies: (value: []) => void;
}

export const ProgramacaoFilters = ({
  filter,
  setFilter,
  movies,
  setMovies,
  setMoviesFilter,
}: Props) => {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');

  const { state } = useUnidade();
  const { enqueueSnackbar } = useSnackbar();

  const getDays = () => {
    const days = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);

      const weekPortugues = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
      const monthPortugues = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
      ];

      const day = date.getDate();
      const month = date.getMonth() + 1;

      const dayWeek = weekPortugues[date.getDay()];

      days.push({
        month: monthPortugues[month - 1],
        date: `${day < 10 ? '0' + day : day}`,
        dateFull: `${date.getFullYear()}-${month < 10 ? '0' + month : month}-${
          day < 10 ? '0' + day : day
        }`,
        dayWeek,
      });
    }
    return days || [];
  };

  const filtrateMovies = (movies: any) => {
    const data = movies.map((movie: any) => {
      const sessions = movie.sessions.filter((session: any) => {
        const languague = session.legendado === false ? 'DUB' : 'LEG';
        if (filter.language && filter.language !== languague) {
          return false;
        }
        if (filter.projection && filter.projection !== session.tipoProjecao) {
          return false;
        }
        return true;
      });

      return { ...movie, sessions };
    });
    setMoviesFilter(data);
  };

  useEffect(() => {
    if (filter && state.unidade.id && filter.dateFull) {
      MoviesPosterService.index(state.unidade.id)
        .then(async (response) => {
          const moviesPromises = response.map((item: any) =>
            MoviesPosterService.sessions
              .show(state.unidade.id, item.id, filter.dateFull)
              .then((sessions) => ({
                ...item,
                sessions: sessions.sort((a: any, b: any) =>
                  a.hora > b.hora ? 1 : -1,
                ),
              })),
          );

          Promise.all(moviesPromises)
            .then((movies: any) => {
              setMovies(movies);
              filtrateMovies(movies);
            })
            .catch(() => {
              enqueueSnackbar('Erro ao obter sessões dos filmes', {
                variant: 'error',
              });
            });
        })
        .catch(() => {
          enqueueSnackbar('Erro ao listar filmes', {
            variant: 'error',
          });
        });
    }
  }, [filter?.dateFull, state.unidade.id]);

  useEffect(() => {
    filtrateMovies(movies);
  }, [filter]);

  useEffect(() => {
    setFilter(getSessionItem('programacao-filters') || getDays()[0]);
  }, []);

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        top: {
          xs: HEADER.H_MOBILE - 2,
          md: HEADER.H_DESKTOP,
        },
        mt: 10,
        width: '100%',
        zIndex: 999,
      }}
    >
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid xs={12}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            textAlign="center"
            alignItems="center"
            sx={{ transform: mdUp ? 'scale(1)' : 'scale(0.7)' }}
          >
            <Card
              sx={{
                width: 'auto',
                overflow: 'hidden',
                boxShadow: '5px 5px 8px rgba(0, 0, 0, 0.50)',
                padding: 2,
              }}
            >
              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                textAlign="center"
                alignItems="center"
              >
                {getDays().map((item) => (
                  <Button
                    key={item.dateFull}
                    sx={{
                      flexDirection: 'column',
                      width: { xs: 'auto', md: 100 },
                      height: { xs: 'auto', md: 100 },
                      backgroundColor: filter?.date === item.date ? 'red' : '',

                      transition: 'background-color 0.3s ease-in-out',
                      ':hover': {
                        transition: 'background-color 0.3s ease-in-out',
                        backgroundColor:
                          filter?.date === item.date ? 'red' : '',
                      },
                      ...(filter?.date !== item.date && {
                        ...bgBlur({
                          color: theme?.palette?.background?.default,
                        }),
                      }),
                    }}
                    onClick={() => {
                      setFilter({ ...filter, ...item });
                      setSessionItem('programacao-date', {
                        ...filter,
                        ...item,
                      });
                    }}
                  >
                    <Typography
                      sx={{ color: 'white', fontWeight: 'bold', mb: -1 }}
                    >
                      {item.dayWeek}
                    </Typography>
                    <Typography
                      variant="h3"
                      sx={{ color: 'white', fontWeight: 'bold' }}
                    >
                      {item.date}
                    </Typography>
                    <Typography
                      sx={{ color: 'white', fontWeight: 'bold', mt: -1 }}
                    >
                      {item.month.toUpperCase()}
                    </Typography>
                  </Button>
                ))}
              </Stack>
            </Card>
            {mdUp && (
              <Card
                sx={{
                  width: 'auto',
                  overflow: 'hidden',
                  boxShadow: '5px 5px 8px rgba(0, 0, 0, 0.50)',
                  padding: 2,
                }}
              >
                <Stack
                  direction="column"
                  spacing={2}
                  justifyContent="center"
                  textAlign="center"
                  alignItems="center"
                >
                  <Stack direction="row" spacing={2}>
                    {PROGRAMACAO_ENUMS.language.map((item) => (
                      <Button
                        fullWidth
                        key={item}
                        variant="contained"
                        sx={{
                          py: 1.17,
                          flexDirection: 'column',
                          backgroundColor:
                            filter?.language === item ? 'red' : '',

                          transition: 'background-color 0.3s ease-in-out',
                          ':hover': {
                            transition: 'background-color 0.3s ease-in-out',
                            backgroundColor:
                              filter?.language === item ? 'red' : '',
                          },
                          ...(filter?.language !== item && {
                            ...bgBlur({
                              color: theme?.palette?.background?.default,
                            }),
                          }),
                        }}
                        onClick={() => {
                          const data = {
                            ...filter,
                            language: filter.language === item ? '' : item,
                          };
                          setFilter(data);
                          setSessionItem('programacao-filters', data);
                        }}
                      >
                        <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                          {item}
                        </Typography>
                      </Button>
                    ))}
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    {' '}
                    {PROGRAMACAO_ENUMS.projection.map((item) => (
                      <Button
                        key={item}
                        sx={{
                          py: 1.17,
                          flexDirection: 'column',
                          backgroundColor:
                            filter?.projection === item ? 'red' : '',

                          transition: 'background-color 0.3s ease-in-out',
                          ':hover': {
                            transition: 'background-color 0.3s ease-in-out',
                            backgroundColor:
                              filter?.projection === item ? 'red' : '',
                          },
                          ...(filter?.projection !== item && {
                            ...bgBlur({
                              color: theme?.palette?.background?.default,
                            }),
                          }),
                        }}
                        onClick={() => {
                          const data = {
                            ...filter,
                            projection: filter.projection === item ? '' : item,
                          };
                          setFilter(data);
                          setSessionItem('programacao-filters', data);
                        }}
                      >
                        <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                          {item}
                        </Typography>
                      </Button>
                    ))}
                  </Stack>
                </Stack>
              </Card>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};
