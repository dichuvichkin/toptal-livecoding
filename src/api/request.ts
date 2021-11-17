import axios from "axios";

type HTTPMethods = 'post' | 'get' | 'put' | 'patch' | 'delete';

export interface IResponse<T> {
  error?: any;
  ok: boolean;
  data?: T;
}

const apiUrl = 'http://openlibrary.org';

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

  return axios(`${apiUrl}/${endpoint}`, {
    method,
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
}
