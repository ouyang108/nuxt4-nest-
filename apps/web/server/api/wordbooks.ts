export default defineEventHandler(async (event) => {
  const { baseURL } = useAppConfig();

  const query = getQuery(event);

  const res: any = await $fetch(`${baseURL}/api/v1/word-book`, {
    query: query,
  });
  return res;
});
