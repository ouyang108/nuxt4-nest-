export default defineEventHandler(async (event) => {
  const { baseURL } = useAppConfig();

  const { id } = getQuery(event);
  const res = await $fetch(
    `${baseURL}/playlist/track/all?id=${id}&limit=30&offset=0`,
  );
  return res;
});
