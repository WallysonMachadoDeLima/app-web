import { Stack, Typography } from "@mui/material";
import { m } from 'framer-motion';
import { varFade } from "src/components/animate";
import { useUnidade } from "src/store/unidade";

export const ProgramacaoTitle= () => {
    const { state } = useUnidade();

    return (
        <Stack
          spacing={3}
          sx={{
            mb: { xs: 2, md: 0 },
            mt: { xs: 0, md: 0 },
            ml: { xs: '7%', md: '10%' },
            pt: { xs: 8, md: 10 },
          }}
        >
          <m.div variants={varFade().inUp}>
            <Typography
              component="div"
              variant="overline"
              sx={{
                fontSize: { xs: '0.6rem', md: '1.1rem' },
              }}
            >
              #EMBREVE
            </Typography>
            <Typography
              variant="h2"
              component="div"
              color="primary.main"
              sx={{ fontSize: { xs: '1.3rem', md: '2.5rem' } }}
            >
              EM BREVE
            </Typography>
            <Typography
              component="div"
              variant="overline"
              sx={{
                fontSize: { xs: '0.6rem', md: '1.1rem' },
              }}
            >
              {(state.unidade.nome || 'Unidade não selecionada').toUpperCase()}
            </Typography>
          </m.div>
        </Stack>
      );
}