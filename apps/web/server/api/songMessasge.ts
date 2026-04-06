export default defineEventHandler(async (event) => {
  const { baseURL } = useAppConfig();

  const { id } = getQuery(event);
  const res = await $fetch(`${baseURL}/song/detail?ids=${id}`);
  return res;
});
