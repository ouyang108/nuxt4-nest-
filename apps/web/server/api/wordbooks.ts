export default defineEventHandler(async (event) => {
  // const { baseURL } = useAppConfig();
  const config = useRuntimeConfig();
  const query = getQuery(event);

  const res: any = await $fetch(`${config.public.apiBase}/api/v1/word-book`, {
    query: query,
  });
  return res;
});
