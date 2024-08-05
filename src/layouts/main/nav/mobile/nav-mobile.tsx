'use client';

import { useEffect } from 'react';

import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// routes
import { usePathname } from 'src/routes/hooks';
// components
import Logo from 'src/components/logo';
import SvgColor from 'src/components/svg-color';
import Scrollbar from 'src/components/scrollbar';
//
import { NavProps } from '../types';
import NavList from './nav-list';
import { Box } from '@mui/material';
import { useSettingsContext } from 'src/components/settings';

// ----------------------------------------------------------------------

export default function NavMobile({ offsetTop, data }: NavProps) {
  const pathname = usePathname();
  const settings = useSettingsContext();

  const nav = useBoolean();

  useEffect(() => {
    if (nav.value) {
      nav.onFalse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <IconButton
        onClick={nav.onTrue}
        sx={{
          ml: -1,
          mr: 1,
          ...(offsetTop && {
            color: 'text.primary',
          }),
        }}
      >
        <SvgColor src="/assets/icons/navbar/ic_menu_item.svg" />
      </IconButton>

      <Drawer
        open={nav.value}
        onClose={nav.onFalse}
        PaperProps={{
          sx: {
            pb: 5,
            width: 260,
          },
        }}
      >
        <Scrollbar>
          <Box
            component="img"
            src={`/assets/logo/logo_full_${settings.themeMode}.png`}
            sx={{
              width: { xs: 110, sm: 130, md: 160 },
              my: 2,
              ml: { xs: 2, sm: 4, md: 2, lg: -3 },
              pointerEvents: 'none',
            }}
          />

          <List component="nav" disablePadding>
            {data.map((link) => (
              <NavList key={link.title} item={link} />
            ))}
          </List>
        </Scrollbar>
      </Drawer>
    </>
  );
}
