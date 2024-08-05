import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// routes
import { paths } from 'src/routes/paths';
import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
// _mock
import { _socials } from 'src/_mock';
// components
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { useEffect, useState } from 'react';
import { FooterService } from 'src/services';
import { useUnidade } from 'src/store/unidade';
import { useSettingsContext } from 'src/components/settings';
import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

const LINKS = [
  {
    headline: 'Institucional',
    children: [
      { name: 'Quem somos', href: paths.about },
      { name: 'Contato', href: paths.contact },
      { name: 'Seja parceiro', href: paths.faqs },
    ],
  },
  {
    headline: 'Legal',
    children: [
      { name: 'Termos de Uso', href: '#' },
      { name: 'Política de Privacidade', href: '#' },
    ],
  },
  {
    headline: 'Ajuda',
    children: [{ name: 'support@email.com.br', href: '#' }],
  },
];

const SOCIALS = [
  {
    value: 'facebook',
    name: 'FaceBook',
    icon: 'eva:facebook-fill',
    color: '#1877F2',
    path: 'https://www.facebook.com/caitlyn.kerluke',
  },
  {
    value: 'instagram',
    name: 'Instagram',
    icon: 'ant-design:instagram-filled',
    color: '#E02D69',
    path: 'https://www.instagram.com/caitlyn.kerluke',
  },
];

// ----------------------------------------------------------------------

export default function Footer() {
  const settings = useSettingsContext();
  const mdUp = useResponsive('up', 'md');
  const pathname = usePathname();

  const { state } = useUnidade();

  const isHome = pathname === '/';

  const [unidade, setUnidade] = useState<{ razaoSocial: string; cnpj: string; endereco: string }>();

  useEffect(() => {
    FooterService.index(state.unidade.id).then((response) => {
      setUnidade(response);
    });
  }, [state.unidade.id]);

  const simpleFooter = (
    <Box
      component="footer"
      sx={{
        py: 5,
        textAlign: 'center',
        position: 'relative',
        bgcolor: 'background.default',
      }}
    >
      <Container>
        <Logo sx={{ mb: 1, mx: 'auto' }} />

        <Typography variant="caption" component="div">
          © Todos os direitos reservados
          <br /> feito por
          <Link href=""> Softlutions </Link>
        </Typography>
      </Container>
    </Box>
  );

  const mainFooter = (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        bgcolor: 'background.default',
      }}
    >
      <Container
        sx={{
          pt: { xs: 3, md: 5 },
          pb: 5,
          textAlign: { xs: 'center', md: 'unset' },
          marginX: { xs: 'auto', md: 'auto' },
        }}
      >
        <Box
          component="img"
          src={`/assets/logo/logo_full_${settings.themeMode}.png`}
          sx={{
            width: { xs: 110, sm: 130, md: 145 },
            mb: 2,
            pointerEvents: 'none',
          }}
        />

        <Grid
          container
          justifyContent={{
            xs: 'center',
            md: 'space-between',
          }}
        >
          <Grid xs={12} md={4.5}>
            <Typography
              variant="body2"
              sx={{
                mx: { xs: 'auto', md: 'unset' },
              }}
            >
              {unidade?.razaoSocial}
              {mdUp && <br />}
              {unidade?.cnpj}
              <br />
              {unidade?.endereco}
            </Typography>

            {state.unidade.id !== 0 && (
              <Stack
                direction="row"
                justifyContent={{ xs: 'center', md: 'flex-start' }}
                sx={{
                  mt: 2,
                  mb: { xs: 5, md: 0 },
                }}
              >
                {SOCIALS.map((social) => (
                  <IconButton
                    key={social.name}
                    sx={{
                      '&:hover': {
                        bgcolor: alpha(social.color, 0.08),
                      },
                    }}
                  >
                    <Iconify
                      color={social.color}
                      icon={social.icon}
                      sx={{ width: 25, height: 1 }}
                    />
                  </IconButton>
                ))}
              </Stack>
            )}
          </Grid>
          <Grid xs={12} md={2.5}></Grid>
          <Grid xs={12} md={5}>
            <Stack
              spacing={5}
              direction="row"
              sx={{ mt: { xs: state.unidade.id !== 0 ? -1 : 3, md: 0 } }}
            >
              {(mdUp ? LINKS : [LINKS[0], LINKS[1]]).map((list) => (
                <Stack
                  key={list.headline}
                  spacing={2}
                  alignItems={{ xs: 'center', md: 'flex-start' }}
                  sx={{ width: 1 }}
                >
                  <Typography component="div" variant="overline">
                    {list.headline}
                  </Typography>

                  {(mdUp ? list.children : [list.children[0], list.children[1]]).map((link) => (
                    <Link
                      key={link.name}
                      component={RouterLink}
                      href={link.href}
                      color="inherit"
                      variant="body2"
                    >
                      {link.name}
                    </Link>
                  ))}
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <Container
        sx={{
          pb: 2,
          textAlign: { xs: 'center', md: 'unset' },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="center">
          <Typography variant="body2" textAlign={'center'}>
            ©2024. Todos os direitos reservados
            <br /> desenvolvido por
            <Link href=""> Softlutions </Link>
          </Typography>
        </Stack>
      </Container>
    </Box>
  );

  return mainFooter; //!isHome ? simpleFooter :
}
