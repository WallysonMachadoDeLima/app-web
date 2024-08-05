'use client';

import { m } from 'framer-motion';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { varHover } from 'src/components/animate';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import Iconify from 'src/components/iconify';
import { IUnidade } from 'src/types/unidade';
import { removeAccents } from 'src/utils/format-string';
import Scrollbar from 'src/components/scrollbar';
import { useEffect, useState } from 'react';
import { useUnidade } from 'src/store/unidade';

// ----------------------------------------------------------------------

type Props = {
  unidades: IUnidade[];
};

export default function LocationPopover({ unidades }: Props) {
  const popover = usePopover();
  const { actions } = useUnidade();

  const [filteredUnidades, setFilteredUnidades] = useState<any>([]);

  const handleSearchUnidades = (name: string) => {
    const filtered = unidades.filter((item: IUnidade) =>
      item.cidade.toLowerCase().includes(name.toLowerCase())
    );

    setFilteredUnidades(filtered);
  };

  const handleNameUnidades = (name: string) => {
    return removeAccents(name)?.replace(/-/g, '')?.replace(/\s+/g, '_')?.toLowerCase();
  };

  const handleClickItem = (unidade: any) => {
    actions.create(unidade);
    popover.onClose();
  };

  useEffect(() => {
    setFilteredUnidades(unidades);
  }, [unidades]);

  return (
    <>
      <Box
        component={m.div}
        transition={{
          duration: 12,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        <IconButton
          component={m.button}
          whileTap="tap"
          whileHover="hover"
          variants={varHover(1.05)}
          aria-label="settings"
          onClick={popover.onOpen}
          sx={{
            width: 40,
            height: 40,
          }}
        >
          <Iconify icon="solar:map-point-bold-duotone" width={24} />
        </IconButton>
      </Box>

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 190, p: 0 }}>
        <Stack sx={{ p: 1 }}>
          <TextField
            placeholder="Buscar"
            size="small"
            onChange={(e) => {
              handleSearchUnidades(e.target.value);
            }}
          />
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: 250 }}>
          <Stack sx={{ p: 1 }}>
            {filteredUnidades.map((item: IUnidade) => {
              const name = handleNameUnidades(item.cidade);

              return (
                <MenuItem
                  key={item.id}
                  value={item.id}
                  onClick={() => handleClickItem({ id: item.id, name: name })}
                >
                  <>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '& > img': { mr: 1, flexShrink: 0, borderRadius: 0.2 },
                      }}
                    >
                      <img
                        loading="lazy"
                        src={`/assets/icons/citys/ic_${name}.png`}
                        srcSet={`/assets/icons/citys/ic_${name}.png 2x`}
                        width="30"
                        height="20"
                        alt=""
                      />
                      {item.cidade}
                    </Box>
                  </>
                </MenuItem>
              );
            })}
            {filteredUnidades.length === 0 && <MenuItem disabled>Cidade não encontada</MenuItem>}
          </Stack>
        </Scrollbar>
      </CustomPopover>
    </>
  );
}
