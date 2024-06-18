import axios, { AxiosError } from 'axios';

const host = import.meta.env.VITE_APP_API_ENTRYPOINT;

export function setupAPIClient() {
  let token = window.localStorage.getItem('token');
  if (token) {
    token = JSON.parse(token);
  }
  const api = axios.create({
    baseURL: host,
  });

  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  api.defaults.headers.common['Accept'] = 'application/json';

  api.interceptors.response.use(
    response => {
      return response;
    },
    (error: AxiosError<any>) => {
        return Promise.reject(error);
    }
  );

  return api;
}

export const api = setupAPIClient();
