export const getLocalItem = (key: string) => {
  if (typeof window === 'undefined') return;
  const data: any = window.localStorage.getItem(key);

  return JSON.parse(data) || null;
};

export const setLocalItem = (key: string, value: any) => {
  if (typeof window === 'undefined') return;
  const data = JSON.stringify(value);

  localStorage.setItem(key, data);
};

export const removeLocalItem = (key: string) => {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(key);
};

export const clearLocal = () => {
  if (typeof window === 'undefined') return;

  localStorage.clear();
};

export const getSessionItem = (key: string) => {
  if (typeof window === 'undefined') return;
  const data: any = window.sessionStorage.getItem(key);

  return JSON.parse(data) || null;
};

export const setSessionItem = (key: string, value: any) => {
  if (typeof window === 'undefined') return;
  const data = JSON.stringify(value);

  sessionStorage.setItem(key, data);
};

export const removeSessionItem = (key: string) => {
  if (typeof window === 'undefined') return;

  if (Array.isArray(key)) {
    key.forEach((item) => {
      sessionStorage.removeItem(item);
    });
  } else {
    sessionStorage.removeItem(key);
  }
};

export const clearSession = () => {
  if (typeof window === 'undefined') return;

  sessionStorage.clear();
};
