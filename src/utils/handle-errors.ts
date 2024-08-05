export const handleErrors = (error?: any, currentMsg?: any) => {
  if (error && error?.response && error?.response?.data) {
    const { statusCode, message } = error.response.data;

    if (message) return message;

    if (currentMsg) return currentMsg;

    return `Serviço indisponível: ${statusCode}`;
  } else return `Erro não identificado`;
};
