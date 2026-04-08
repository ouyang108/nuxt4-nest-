export default defineEventHandler(async (event) => {
  // const { baseURL } = useAppConfig();
  const config = useRuntimeConfig();
  const query = await readBody(event);

  const res: any = await $fetch(
    `${config.apiInternalBase}/api/v1/user/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    },
  );
  return res;
});
