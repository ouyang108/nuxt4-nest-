// 使用 as const 将其变为只读元组，防止 push 等修改操作
export const BLOCKED_ROUTES: string[] = ["/home", "/word-book"] as const;
