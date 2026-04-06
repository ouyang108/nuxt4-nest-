export default defineEventHandler(async (event) => {
  const { baseURL } = useAppConfig();

  const { id } = getQuery(event);
  const res = await $fetch(`${baseURL}/song/url/v1?id=${id}&level=exhigh`);
  return res;
});
