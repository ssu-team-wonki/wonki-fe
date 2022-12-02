import useSWR, { Key, SWRConfiguration } from 'swr';

export interface RequestProps {
  token?: string;
  method: 'POST' | 'GET' | 'PUT' | 'DELETE';
  url: string;
  body?: object;
  headers?: Record<string, string>;
}

const withToken = (): Record<string, string> => {
  const tokenJSON = localStorage.getItem('token');
  if (tokenJSON) {
    const token = JSON.parse(tokenJSON) as string;
    return { 'X-AUTH-TOKEN': token };
  }
  return {};
};

export const request = <R>({ method, url, body, headers }: RequestProps) =>
  fetch(`${process.env.REACT_APP_SERVICE_PATH || ''}/${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...withToken(),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  }).then(async response => response.json() as Promise<R>);

export const fetcher = <T>(url: string) =>
  request<T>({
    method: 'GET',
    url,
  });

export const useBaseSWRFetcher = <T>(key: Key, config?: SWRConfiguration) => {
  const { data, error, mutate } = useSWR<T, {}>(key, fetcher, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      // if (error.status === 404) return;
      if (retryCount >= 3) return;

      setTimeout(() => {
        revalidate({ retryCount });
      }, 5000);
    },
    revalidateIfStale: true,
    revalidateOnFocus: false,
    dedupingInterval: 1000 * 60 * 60,
    focusThrottleInterval: 1000 * 60 * 60,
    ...config,
  });

  return {
    key,
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
