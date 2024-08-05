// routes
import { paths } from 'src/routes/paths';
// config
import Iconify from 'src/components/iconify';
// components

// ----------------------------------------------------------------------

export const navConfig = [
  {
    title: 'Home',
    icon: <Iconify icon="solar:home-2-bold-duotone" />,
    path: '/',
  },
  {
    title: 'Programação',
    icon: <Iconify icon="solar:clapperboard-open-play-bold-duotone" width={24} />,
    path: paths.programacao,
  },
  {
    title: 'Em Breve',
    icon: <Iconify icon="solar:rewind-forward-bold-duotone" />,
    path: paths.emBreve,
  },
  {
    title: 'Preços',
    icon: <Iconify icon="solar:wallet-money-bold-duotone" width={23} />,
    path: paths.precos,
  },
];
