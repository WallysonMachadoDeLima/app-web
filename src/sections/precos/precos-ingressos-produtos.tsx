import { m } from 'framer-motion';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MotionContainer, varFade } from 'src/components/animate';
import { useUnidade } from 'src/store/unidade';
import { Card, Link } from '@mui/material';
import { useEffect, useState } from 'react';
import { PrecosService } from 'src/services';

// ----------------------------------------------------------------------

const STYLES_CARD = {
  p: { xs: 2, md: 3 },
  width: '100%',
  cursor: 'pointer',
  transition: 'box-shadow 0.3s ease,  transform 0.2s ease',
  '&:hover': {
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.1)',
    transform: 'scale(0.98)',
  },
};

const PARAGRAFOS = [
  'Dispõe sobre o benefício do pagamento de meia-entrada para estudantes, idosos, pessoas com deficiência e jovens de 15 a 29 anos comprovadamente carentes em espetáculos artístico-culturais e esportivos, e revoga a Medida Provisória no 2.208, de 17 de agosto de 2001.',
  'Art. 1o É assegurado aos estudantes o acesso a salas de cinema, cineclubes, teatros,espetáculos musicais e circenses e eventos educativos, esportivos, de lazer e deentretenimento, em todo o território nacional, promovidos por quaisquer entidades erealizados em estabelecimentos públicos ou particulares, mediante pagamento da metade dopreço do ingresso efetivamente cobrado do público em geral. A PRESIDENTA DA REPÚBLICAFaço saber que o Congresso Nacional decreta e eu sanciono a seguinte Lei:',
  ' § 1o  O benefício previsto no caput não será cumulativo com quaisquer outras promoções e convênios e, também, não se aplica ao valor dos serviços adicionais eventualmente oferecidos em camarotes, áreas e cadeiras especiais.',
  <>
    § 2o Terão direito ao benefício os estudantes regularmente matriculados nos níveis e modalidades
    de educação e ensino previstos no{' '}
    <Link
      href={'https://www.planalto.gov.br/ccivil_03/LEIS/L9394.htm#titulov'}
      target="_blank"
      rel="noopener"
      underline="none"
      variant="body1"
    >
      Título V da Lei no 9.394, de 20 de dezembro de 1996
    </Link>
    , que comprovem sua condição de discente, mediante a apresentação, no momento da aquisição do
    ingresso e na portaria do local de realização do evento, da Carteira de Identificação Estudantil
    (CIE), emitida pela Associação Nacional de Pós-Graduandos (ANPG), pela União Nacional dos
    Estudantes (UNE), pela União Brasileira dos Estudantes Secundaristas (Ubes), pelas entidades
    estaduais e municipais filiadas àquelas, pelos Diretórios Centrais dos Estudantes (DCEs) e pelos
    Centros e Diretórios Acadêmicos, com prazo de validade renovável a cada ano, conforme modelo
    único nacionalmente padronizado e publicamente disponibilizado pelas entidades nacionais antes
    referidas e pelo Instituto Nacional de Tecnologia da Informação (ITI), com certificação digital
    deste, podendo a carteira de identificação estudantil ter 50% (cinquenta por cento) de
    características locais.
  </>,
  '§ 3o (VETADO).',
  '§ 4o A Associação Nacional de Pós-Graduandos, a União Nacional dos Estudantes, a União Brasileira dos Estudantes Secundaristas e as entidades estudantis estaduais e municipais filiadas àquelas deverão disponibilizar um banco de dados contendo o nome e o número de registro dos estudantes portadores da Carteira de Identificação Estudantil (CIE), expedida nos termos desta Lei, aos estabelecimentos referidos no caput deste artigo e ao Poder Público.',
  '§ 5o A representação estudantil é obrigada a manter o documento comprobatório do vínculo do aluno com o estabelecimento escolar, pelo mesmo prazo de validade da respectiva Carteira de Identificação Estudantil (CIE).',
  '§ 6o A Carteira de Identificação Estudantil (CIE) será válida da data de sua expedição até o dia 31 de março do ano subsequente.',
  '§ 7o (VETADO).',
  '§ 8o Também farão jus ao benefício da meia-entrada as pessoas com deficiência, inclusive seu acompanhante quando necessário, sendo que este terá idêntico benefício no evento em que comprove estar nesta condição, na forma do regulamento.',
  '§ 9o Também farão jus ao benefício da meia-entrada os jovens de 15 a 29 anos de idade de baixa renda, inscritos no Cadastro Único para Programas Sociais do Governo Federal (CadÚnico) e cuja renda familiar mensal seja de até 2 (dois) salários mínimos, na forma do regulamento.',
  '§ 10. A concessão do direito ao benefício da meia-entrada é assegurada em 40% (quarenta por cento) do total dos ingressos disponíveis para cada evento.',
  '§ 11. As normas desta Lei não se aplicam aos eventos Copa do Mundo FIFA de 2014 e Olimpíadas do Rio de Janeiro de 2016.',
  'Art. 2o O cumprimento do percentual de que trata o § 10 do art. 1o será aferido por meio de instrumento de controle que faculte ao público o acesso a informações atualizadas referentes ao quantitativo de ingressos de meia-entrada disponíveis para cada sessão.',
  '§ 1o As produtoras dos eventos deverão disponibilizar:',
  'I - o número total de ingressos e o número de ingressos disponíveis aos usuários da meia-entrada, em todos os pontos de venda de ingressos, de forma visível e clara;',
  'II – o aviso de que houve o esgotamento dos ingressos disponíveis aos usuários da meia-entrada em pontos de venda de ingressos, de forma visível e clara, quando for o caso.',
  '§ 2o Os estabelecimentos referidos no caput do art. 1o deverão disponibilizar o relatório da venda de ingressos de cada evento à Associação Nacional de Pós-Graduandos, à União Nacional dos Estudantes, à União Brasileira dos Estudantes Secundaristas, a entidades estudantis estaduais e municipais filiadas àquelas e ao Poder Público, interessados em consultar o cumprimento do disposto no § 10 do art. 1o.',
  'Art. 3o Caberá aos órgãos públicos competentes federais, estaduais e municipais a fiscalização do cumprimento desta Lei.',
  'Parágrafo único. A comprovação da emissão irregular ou fraudulenta de carteiras estudantis acarretará à entidade emissora, conforme o caso, sem prejuízo das sanções administrativas e penais aplicáveis aos responsáveis pela irregularidade ou fraude:',
  'I - multa;',
  'II - suspensão temporária da autorização para emissão de carteiras estudantis; e',
  'III - (VETADO).',
  'Art. 4o  Os estabelecimentos referidos no caput do art. 1o deverão afixar cartazes, em local visível da bilheteria e da portaria, de que constem as condições estabelecidas para o gozo da meia-entrada, com os telefones dos órgãos de fiscalização.',
  <>
    Art. 5o Revoga-se a{' '}
    <Link
      href={'https://www.planalto.gov.br/ccivil_03/MPV/Antigas_2001/2208.htm'}
      target="_blank"
      rel="noopener"
      underline="none"
      variant="body1"
    >
      Medida Provisória no 2.208, de 17 de agosto de 2001.
    </Link>
  </>,
  'Art. 6º Esta Lei entra em vigor na data de sua publicação, gerando efeitos a partir da edição de sua norma regulamentadora.',
  'Brasília,  26  de dezembro de 2013; 192o da Independência e 125o da República.',
];

// ----------------------------------------------------------------------

export default function Precos() {
  const { state } = useUnidade();

  const [precos, setPrecos] = useState<IPrecos[]>([]);

  const renderTitle = (
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
          VALORES DOS
        </Typography>
        <Typography
          variant="h2"
          component="div"
          color="primary.main"
          sx={{ fontSize: { xs: '1.3rem', md: '2.5rem' } }}
        >
          INGRESSOS/ PRODUTOS
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

  useEffect(() => {
    if (state.unidade.id && state.unidade.id !== 0) {
      PrecosService.index(state.unidade.id).then((response) => {
        setPrecos(response);
      });
    }
  }, [state.unidade.id]);

  return (
    <>
      <MotionContainer action animate={true}>
        {renderTitle}

        <Stack spacing={3} direction="column" sx={{ mx: { xs: '7%', md: '10%' }, mt: 7, mb: 5 }}>
          {precos.length === 0 && (
            <>
              <Card sx={{ ...STYLES_CARD }}>
                <Stack direction={'column'} spacing={3}>
                  <Typography variant="h3" textAlign={'center'}>
                    UNIDADE NÃO SELECIONADA
                  </Typography>
                  <Typography variant="h5" textAlign={'center'}>
                    Selecione uma unidade para que os preços dos ingressos e dos produtos possam ser
                    listados
                  </Typography>
                </Stack>
              </Card>
            </>
          )}
          {precos.map((item: IPrecos) => (
            <Card sx={{ ...STYLES_CARD }}>
              <Stack direction={'column'} spacing={3}>
                <Typography variant="h3" textAlign={{ xs: 'center', md: 'start' }}>
                  {item.nome}
                </Typography>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 2, md: 3 }}>
                  {item.experiencia.map((exp) => (
                    <div key={exp.nome}>
                      <Typography variant="h4">{exp.nome}</Typography>
                      <Typography
                        variant="body1"
                        mt={2}
                        mb={3}
                        textAlign={{ xs: 'justify', md: 'start' }}
                      >
                        {exp.descricao}
                      </Typography>
                      {exp.tipoProjecao.map((proj) => (
                        <Stack direction={'row'} spacing={3} mb={3}>
                          <Typography variant="h3">{proj.projecao}</Typography>
                          <Stack direction={'row'} spacing={3} mt={1}>
                            {proj.ingresso.map((ing) => (
                              <Stack direction={'column'} spacing={3}>
                                <Typography
                                  key={ing.tipoPoltrona}
                                  variant="body1"
                                  mt={{ xs: -1, md: -0.5 }}
                                >
                                  {`${ing.tipoPoltrona}`}
                                </Typography>
                                <Stack direction={'row'} spacing={3}>
                                  <Typography key={ing.tipoPoltrona} variant="subtitle2" mt={-2.8}>
                                    R$
                                  </Typography>
                                  <Typography key={ing.tipoPoltrona} variant="h5" mt={-2.8} ml={-2}>
                                    {ing.valor.substring(3)}
                                  </Typography>
                                </Stack>
                              </Stack>
                            ))}
                          </Stack>
                        </Stack>
                      ))}
                    </div>
                  ))}
                </Stack>
              </Stack>
            </Card>
          ))}
          <Typography variant="inherit" textAlign={'justify'}>
            * O Preço de meia entrada da promoção "Segunda e Quarta Todos pagam meia" é concedido
            sobre o valor da entrada inteira da exibição durante os dias de meio de semana e não se
            aplica aos dias correspondentes que incidirem sobre exibições de pré-estreias ou
            feriados.
          </Typography>

          <Stack
            spacing={3}
            sx={{
              mb: { xs: 2, md: 0 },
              mt: { xs: 0, md: 7 },
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
                CONFIRA
              </Typography>
              <Typography
                variant="h2"
                component="div"
                color="primary.main"
                sx={{ fontSize: { xs: '1.3rem', md: '2.5rem' } }}
              >
                QUEM PAGA MEIA?
              </Typography>
            </m.div>
          </Stack>
          <Typography variant="body1">
            Presidência da República
            <br />
            Casa Civil
            <br />
            Subchefia para Assuntos Jurídicos
          </Typography>

          <Typography variant="h6">LEI Nº 12.933, DE 26 DE DEZEMBRO DE 2013.</Typography>

          <Typography variant="body2">
            Produção de efeitos
            <br />
            Mensagem de Veto
          </Typography>

          {PARAGRAFOS.map((item) => (
            <Typography variant="body1" textAlign="justify">
              {item}
            </Typography>
          ))}
          <Typography variant="body1" textAlign="justify" my={-1}>
            DILMA ROUSSEFF
          </Typography>
          <Typography variant="body1" textAlign="justify" my={-1}>
            José Eduardo Cardozo
          </Typography>
          <Typography variant="body1" textAlign="justify" my={-1}>
            Marta Suplicy
          </Typography>
          <Typography variant="body1" textAlign="justify" my={-1}>
            Gilberto Carvalho
          </Typography>
          <Typography variant="body1" textAlign="justify" my={-1}>
            Maria do Rosário Nunesa
          </Typography>
        </Stack>
      </MotionContainer>
    </>
  );
}
