'use client';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';
import { bgBlur } from 'src/theme/css';
import { HEADER } from '../config-layout';
import { navConfig } from './config-navigation';
import NavMobile from './nav/mobile';
import NavDesktop from './nav/desktop';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { SettingsButton, HeaderShadow, LoginButton, AccountPopover } from '../_common';
import { useSettingsContext } from 'src/components/settings';
import { useEffect, useMemo, useState } from 'react';
import { UnidadeServices } from 'src/services';
import { useSnackbar } from 'notistack';
import { IUnidade } from 'src/types/unidade';
import { getLocalItem, setLocalItem } from 'src/utils/storage';
import LocationPopover from '../_common/location-popover';
import { removeAccents } from 'src/utils/format-string';
import FormProvider from 'src/components/hook-form/form-provider';
import { yupResolver } from '@hookform/resolvers/yup';
import { RHFAutocomplete } from 'src/components/hook-form';
import { useUnidade } from 'src/store/unidade';
import Logo from 'src/components/logo';

// ----------------------------------------------------------------------

export default function Header() {
  const theme = useTheme();
  const settings = useSettingsContext();

  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);
  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();
  const { actions, state } = useUnidade();

  const [unidades, setUnidades] = useState<IUnidade[]>([]);

  const handleNameUnidades = (name: string) => {
    return removeAccents(name)?.replace(/-/g, '')?.replace(/\s+/g, '_')?.toLowerCase();
  };

  useEffect(() => {
    UnidadeServices.index()
      .then((response) => {
        setUnidades(response);
      })
      .catch(() => {
        enqueueSnackbar('Erro ao listar banners', {
          variant: 'error',
        });
      });

    // ---------------- funções globais ---------------- /

    // Identificar dispositivo com tela de 1280x720
    const width = window.innerWidth;
    const height = window.innerHeight;

    const isWidthInRange = width > 1280 && width < 1380;
    const isHeightInRange = height > 600 && height < 700;

    setLocalItem('isMinDesktop', isWidthInRange && isHeightInRange);

    // Identificar dispositivo mobile
    const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

    setLocalItem('isMobile', 'true');

    // ---------------- funções globais ---------------- /
  }, []);

  const NewFilmeSchema = Yup.object().shape({
    unidade: Yup.mixed().nullable(),
  });

  const defaultValues = useMemo(
    () => ({
      unidade: state.unidade,
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewFilmeSchema),
    defaultValues,
  });

  return (
    <AppBar>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(['height'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(!mdUp && {
            ...bgBlur({
              color: theme.palette.background.default,
            }),
          }),
          ...(offsetTop && {
            ...bgBlur({
              color: theme.palette.background.default,
            }),
            height: {
              md: HEADER.H_DESKTOP_OFFSET,
            },
          }),
        }}
      >
        <Container sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
          {!mdUp && (
            <>
              <NavMobile offsetTop={offsetTop} data={navConfig} /> <Logo />
            </>
          )}
          {mdUp && (
            <Box
              component="img"
              src={`/assets/logo/logo_full_${settings.themeMode}.png`}
              sx={{
                width: { xs: 110, sm: 130, md: 160 },
                my: 2,
                ml: { sm: 4, md: 2, lg: -3 },
                pointerEvents: 'none',
              }}
            />
          )}

          <Box sx={{ flexGrow: 1 }} />

          {mdUp && <NavDesktop offsetTop={offsetTop} data={navConfig} />}

          <Stack alignItems="center" direction="row" mr={{ xs: 0, md: -3 }}>
            {mdUp && (
              <>
                <SettingsButton
                  sx={{
                    ml: { xs: 1, md: 0 },
                    mr: 2,
                  }}
                />
                <LoginButton />
              </>
            )}
            <FormProvider methods={methods}>
              <RHFAutocomplete
                fullWidth
                freeSolo
                name="unidade"
                label=""
                placeholder="Selecione sua unidade"
                size="small"
                sx={{
                  width: 174,
                  maxWidth: 174,
                  mr: { xs: 1, md: 0 },
                }}
                options={unidades.map((option: IUnidade) => option)}
                getOptionLabel={(option: any) => option?.cidade}
                onChange={(_: any, newValue: any) => {
                  if (newValue) {
                    actions.create(newValue);
                  } else actions.remove();
                }}
                renderOption={(props, option: IUnidade) => (
                  <>
                    <Box
                      component="li"
                      {...props}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'start',
                        cursor: 'pointer',
                        '& > img': { mr: 1, flexShrink: 0, borderRadius: 0.2 },
                        fontSize: 8,
                      }}
                    >
                      <img
                        loading="lazy"
                        src={`/assets/icons/citys/ic_${handleNameUnidades(option?.cidade)}.png`}
                        srcSet={`/assets/icons/citys/ic_${handleNameUnidades(
                          option?.cidade
                        )}.png 2x`}
                        width="24"
                        height="15"
                        alt={option.cidade}
                      />
                      {option.cidade.length > 12
                        ? `${option.cidade.substring(0, 12)}...`
                        : option.cidade}
                    </Box>
                  </>
                )}
              />
            </FormProvider>

            {!mdUp && <AccountPopover />}
          </Stack>
        </Container>
      </Toolbar>

      {offsetTop && <HeaderShadow />}
    </AppBar>
  );
}
