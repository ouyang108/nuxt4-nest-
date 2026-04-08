/**
 * $request — 用于用户交互场景（客户端调用）
 * 基于 $fetch 封装，支持 token 注入、错误处理、自动刷新 token
 */

import type { FetchOptions, FetchResponse } from "ofetch";

// -------------------- 类型定义 --------------------

export interface ApiResponse<T = unknown> {
  code: number;
  data: T;
  message: string;
}

export interface RequestOptions<T = unknown> extends FetchOptions<"json"> {
  /** 是否跳过 token 注入（如登录/注册接口） */
  skipAuth?: boolean;
  /** 自定义错误处理，返回 true 表示已处理，阻止默认行为 */
  onError?: (error: ApiError) => boolean | void;
  /** 请求成功后的回调（code === 0 时触发） */
  onSuccess?: (data: T) => void;
}

export class ApiError extends Error {
  code: number;
  statusCode: number;
  data: unknown;

  constructor(
    message: string,
    code: number,
    statusCode: number,
    data?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.statusCode = statusCode;
    this.data = data;
  }
}

// -------------------- Token 管理 --------------------

const TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

/** 获取访问 token（兼容 SSR：优先 cookie，其次 localStorage） */
function getToken(): string | null {
  if (import.meta.server) return null;
  // 客户端先查 localStorage，再查 cookie
  const local = localStorage.getItem(TOKEN_KEY);
  if (local) return local;
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${TOKEN_KEY}=`))
      ?.split("=")[1] ?? null
  );
}

function getRefreshToken(): string | null {
  if (import.meta.server) return null;
  return (
    localStorage.getItem(REFRESH_TOKEN_KEY) ??
    document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${REFRESH_TOKEN_KEY}=`))
      ?.split("=")[1] ??
    null
  );
}

export function setToken(token: string, refreshToken?: string): void {
  localStorage.setItem(TOKEN_KEY, token);
  // 同时写 cookie，方便 SSR 读取（7天有效）
  const expires = new Date(Date.now() + 7 * 24 * 3600 * 1000).toUTCString();
  document.cookie = `${TOKEN_KEY}=${token}; expires=${expires}; path=/; SameSite=Lax`;
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    document.cookie = `${REFRESH_TOKEN_KEY}=${refreshToken}; expires=${expires}; path=/; SameSite=Lax`;
  }
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  document.cookie = `${TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  document.cookie = `${REFRESH_TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

// -------------------- Token 刷新（防并发） --------------------

let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken(): Promise<string> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    const config = useRuntimeConfig();
    const refreshToken = getRefreshToken();
    if (!refreshToken) throw new ApiError("未登录", 401, 401);

    const res = await $fetch<
      ApiResponse<{ accessToken: string; refreshToken: string }>
    >(`${config.public.apiBase}/auth/refresh`, {
      method: "POST",
      body: { refreshToken },
    });

    if (res.code !== 0) throw new ApiError(res.message, res.code, 200);

    setToken(res.data.accessToken, res.data.refreshToken);
    return res.data.accessToken;
  })().finally(() => {
    refreshPromise = null;
  });

  return refreshPromise;
}

// -------------------- 核心请求函数 --------------------

/**
 * $request — 用户交互场景（客户端）
 *
 * @example
 * const data = await $request<User>('/user/profile')
 * const data = await $request<User>('/user/update', { method: 'POST', body: { name: 'Tom' } })
 */
export async function $request<T = unknown>(
  url: string,
  options: RequestOptions<T> = {},
): Promise<T> {
  const config = useRuntimeConfig();
  const {
    skipAuth = false,
    onError,
    onSuccess,
    body,
    ...fetchOptions
  } = options;

  // 构建请求头
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(fetchOptions.headers as Record<string, string>),
  };

  if (!skipAuth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const doRequest = () =>
    $fetch<ApiResponse<T>>(url, {
      baseURL: config.public.apiBase,
      ...(fetchOptions as object),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      body: body as any,
      headers,
      // 不抛出 HTTP 错误，统一在 onResponse 处理
      onResponseError({
        response,
      }: {
        response: FetchResponse<ApiResponse<T>>;
      }) {
        // 只在非 401 时在这里处理，401 留给下面重试逻辑
        if (response.status !== 401) {
          const body = response._data as ApiResponse<T> | undefined;
          throw new ApiError(
            body?.message ?? `HTTP ${response.status}`,
            body?.code ?? response.status,
            response.status,
            body,
          );
        }
      },
    });

  let res: ApiResponse<T>;

  try {
    res = await doRequest();
  } catch (err: unknown) {
    // 401 → 尝试刷新 token 后重试一次
    if (err instanceof ApiError && err.statusCode === 401 && !skipAuth) {
      try {
        const newToken = await refreshAccessToken();
        headers["Authorization"] = `Bearer ${newToken}`;
        res = await doRequest();
      } catch {
        clearToken();
        handleAuthRedirect();
        throw new ApiError("登录已过期，请重新登录", 401, 401);
      }
    } else {
      throw err;
    }
  }

  // 业务错误码处理
  console.log(res, "res");
  if (res.code !== 200) {
    const apiError = new ApiError(res.message, res.code, 200, res.data);

    if (res.code === 401) {
      clearToken();
      handleAuthRedirect();
    }

    const handled = onError?.(apiError);
    if (!handled) {
      // 默认错误提示（如果项目引入了 toast 可在此替换）
      console.error(`[API Error] ${res.message} (code: ${res.code})`);
    }
    throw apiError;
  }

  onSuccess?.(res.data);
  return res.data;
}

function handleAuthRedirect() {
  if (import.meta.client) {
    const router = useRouter();
    router.push("/login");
  }
}

// -------------------- 快捷方法 --------------------

export const request = {
  get: <T>(url: string, options?: RequestOptions<T>) =>
    $request<T>(url, { method: "GET", ...options }),

  post: <T>(url: string, body?: any, options?: RequestOptions<T>) =>
    $request<T>(url, { method: "POST", body, ...options }),

  put: <T>(url: string, body?: any, options?: RequestOptions<T>) =>
    $request<T>(url, { method: "PUT", body, ...options }),

  patch: <T>(url: string, body?: any, options?: RequestOptions<T>) =>
    $request<T>(url, { method: "PATCH", body, ...options }),

  delete: <T>(url: string, options?: RequestOptions<T>) =>
    $request<T>(url, { method: "DELETE", ...options }),
};
