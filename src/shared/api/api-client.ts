const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL!;
const API_TOKEN = process.env.EXPO_PUBLIC_API_TOKEN!;

type QueryValue = string | number | boolean | null | undefined;

type RequestOptions = {
  query?: Record<string, QueryValue>;
  signal?: AbortSignal;
};

type ApiErrorPayload = {
  ok?: boolean;
  error?: {
    code?: string;
    message?: string;
  };
};

export class ApiRequestError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: string
  ) {
    super(message);
    this.name = 'ApiRequestError';
  }
}

function buildUrl(path: string, query?: Record<string, QueryValue>) {
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  const normalizedBaseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL : `${API_BASE_URL}/`;
  const url = new URL(normalizedPath, normalizedBaseUrl);

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === null) {
        continue;
      }
      url.searchParams.set(key, String(value));
    }
  }

  return url;
}

export async function apiGet<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const url = buildUrl(path, options.query);
  const response = await fetch(url, {
    method: 'GET',
    signal: options.signal,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  const payload = (await response.json().catch(() => null)) as ApiErrorPayload | T | null;

  if (!response.ok) {
    const message =
      (payload as ApiErrorPayload | null)?.error?.message ?? 'Не удалось выполнить запрос к API';
    const code = (payload as ApiErrorPayload | null)?.error?.code;
    throw new ApiRequestError(message, response.status, code);
  }

  return payload as T;
}
