export default defineEventHandler(async (event) => {
  const { baseURL } = useAppConfig();

  const { id } = getQuery(event);
  const res: any = await $fetch(`${baseURL}/lyric?id=${id}`);
  return res;
});
