import axios, { AxiosResponse } from 'axios';
import { reAuthorize } from './oauth.api';

type HTTPMethods = 'post' | 'get' | 'put' | 'patch' | 'delete';

export interface IResponse<T> {
  error?: any;
  ok: boolean;
  data?: T;
  response?: AxiosResponse<T>;
}

const apiUrl = process.env.REACT_APP_API_URL;

export async function request<T = any>(
  ...args: [
    method: HTTPMethods,
    endpoint: string,
    params?: any,
    options?: object,
  ]
): Promise<IResponse<T>> {
  const [method, endpoint, params, options = {}] = args;
  const data: {
    params?: any;
    data?: any;
  } = {};
  if (method.toLowerCase() === 'get') {
    data.params = params;
  } else {
    data.data = params;
  }

  const headers: any = {};

  headers.Authorization = `Basic ${process.env.REACT_APP_BASIC_AUTHORIZATION_TOKEN}`;
  const token = localStorage.getItem('access_token');
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const r = await axios(`${apiUrl}/${endpoint}`, {
    method,
    headers,
    ...data,
    ...options,
  })
    .then<IResponse<T>>((response) => ({
      ok: true,
      data: response.data,
      response,
    }))
    .catch((error) => {
      console.error('request_error: ', error.message);

      return {
        ok: false,
        error,
      };
    });

  if (r.error?.response?.data?.error === 'invalid_token') {
    const ok = await reAuthorize();

    if (ok) {
      return request(...args);
    }
  }

  return r;
}
