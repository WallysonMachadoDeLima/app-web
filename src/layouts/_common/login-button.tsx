'use client';

import { Theme, SxProps } from '@mui/material/styles';
import Button from '@mui/material/Button';
// routes
import { RouterLink } from 'src/routes/components';
// config
import { PATH_AFTER_LOGIN } from 'src/config-global';
import { getSessionItem } from 'src/utils/storage';

// ----------------------------------------------------------------------

type Props = {
  sx?: SxProps<Theme>;
};

export default function LoginButton({ sx }: Props) {
  const userAgent =
    typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent,
    );

  return (
    <Button
      component={RouterLink}
      href={`https://logincinema.com.br/`}
      variant="contained"
      sx={{
        mr: 1,
        ...sx,
        size: { xs: 'medium', md: 'small' },
        height: { xs: 'auto', md: 35 },
      }}
    >
      Entrar
    </Button>
  );
}
