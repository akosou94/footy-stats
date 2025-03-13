import axios from "axios";

interface HeaderService {
  getTokenHeaders: () => Record<string, string>;
}

export const makeHttpService = (
  baseURL: string,
  headerService: HeaderService,
) => {
  const instance = axios.create({
    baseURL,
  });

  instance.interceptors.request.use(async (request: any) => {
    request.headers = {
      ...request.headers,
      ...headerService.getTokenHeaders(),
    };

    return request;
  });

  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      return Promise.reject(err.response);
    },
  );

  return instance;
};

export const makeHttpServiceMatches = (baseURL: string) => {
  const instance = axios.create({
    baseURL,
  });

  return instance;
};
