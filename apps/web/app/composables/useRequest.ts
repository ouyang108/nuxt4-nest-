/**
 * useRequest / useLazyRequest — SSR 数据获取封装
 * 基于 useFetch / useLazyFetch，支持 token 注入、统一错误处理
 */

import type { UseFetchOptions, AsyncData } from "nuxt/app";
import type { FetchError } from "ofetch";
import type { ApiResponse } from "~/utils/request";

// -------------------- 类型定义 --------------------

export type UseRequestOptions<T> = Omit<UseFetchOptions<T>, "transform"> & {
  /** 是否跳过 token 注入（如登录/注册接口） */
  skipAuth?: boolean;
  /** 请求成功（code === 0）后的回调 */
  onSuccess?: (data: T) => void;
  /** 请求失败后的回调，返回 true 表示已处理，阻止控制台打印 */
  onError?: (error: { code: number; message: string }) => boolean | void;
};

// -------------------- 内部工具 --------------------

function getToken(): string | undefined {
  return useCookie("access_token", { readonly: true }).value ?? undefined;
}

function buildOptions<T>(
  url: string | (() => string),
  fetchOptions: Omit<
    UseRequestOptions<T>,
    "skipAuth" | "onSuccess" | "onError"
  >,
  skipAuth: boolean,
  onSuccess: ((data: T) => void) | undefined,
  onError:
    | ((err: { code: number; message: string }) => boolean | void)
    | undefined,
  prefix = "",
) {
  const config = useRuntimeConfig();
  const token = getToken();
  const urlStr = typeof url === "function" ? url() : url;

  return {
    baseURL: config.public.apiBase as string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transform: (raw: any): T => {
      const res = raw as ApiResponse<T>;
      if (res.code !== 200) {
        const handled = onError?.({ code: res.code, message: res.message });
        if (!handled) {
          console.error(`[useRequest] ${res.message} (code: ${res.code})`);
        }
        return null as unknown as T;
      }
      onSuccess?.(res.data);
      return res.data;
    },
    // 先展开用户选项，再覆盖内部控制的字段
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      ...(fetchOptions.headers as Record<string, string>),
      ...(!skipAuth && token ? { Authorization: `Bearer ${token}` } : {}),
    } as Record<string, string>,
    key:
      fetchOptions.key ??
      `${prefix}${urlStr}-${JSON.stringify(fetchOptions.query ?? {})}`,
    onResponseError({ response }: { response: { status: number } }) {
      if (response.status === 401 && import.meta.client) {
        useRouter().push("/login");
      }
    },
  };
}

// -------------------- useRequest（useFetch） --------------------

/**
 * useRequest — SSR 场景数据获取，阻塞导航直到数据就绪
 *
 * @example
 * const { data, pending, error } = await useRequest<User[]>('/users')
 * const { data } = await useRequest<Post>('/post', { query: { id: 1 } })
 */
export function useRequest<T = unknown>(
  url: string | (() => string),
  options: UseRequestOptions<T> = {},
): AsyncData<T | null, FetchError | null> {
  const { skipAuth = false, onSuccess, onError, ...fetchOptions } = options;
  const opts = buildOptions(url, fetchOptions, skipAuth, onSuccess, onError);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useFetch<T>(url, opts as any) as AsyncData<
    T | null,
    FetchError | null
  >;
}

// -------------------- useLazyRequest（useLazyFetch） --------------------

/**
 * useLazyRequest — 懒加载场景，不阻塞导航，用 pending 控制骨架屏
 * 内部强制使用 useLazyFetch
 *
 * @example
 * const { data, pending, refresh } = useLazyRequest<WordList>('/api/wordbooks', {
 *   query: queryRef,
 *   watch: false,
 * })
 */
export function useLazyRequest<T = unknown>(
  url: string | (() => string),
  options: UseRequestOptions<T> = {},
): AsyncData<T | null, FetchError | null> {
  const { skipAuth = false, onSuccess, onError, ...fetchOptions } = options;
  // console.log("useLazyRequest options:", options);
  const opts = buildOptions(
    url,
    fetchOptions,
    skipAuth,
    onSuccess,
    onError,
    "lazy-",
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useLazyFetch<T>(url, opts as any) as AsyncData<
    T | null,
    FetchError | null
  >;
}

// -------------------- 快捷方法 --------------------

export const useGet = <T>(
  url: string | (() => string),
  options?: UseRequestOptions<T>,
) => useRequest<T>(url, { method: "GET", ...options });

export const usePost = <T>(
  url: string | (() => string),
  body?: Record<string, unknown>,
  options?: UseRequestOptions<T>,
) => useRequest<T>(url, { method: "POST", body, ...options });
