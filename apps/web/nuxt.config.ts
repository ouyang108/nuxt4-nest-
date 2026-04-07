// https://nuxt.com/docs/api/configuration/nuxt-config
import { codeInspectorPlugin } from "code-inspector-plugin";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: ["@nuxt/eslint", "@nuxt/icon", "@nuxtjs/tailwindcss", "shadcn-nuxt"],
  runtimeConfig: {
    // public 里的变量在客户端和服务器端均可访问
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "http://localhost:3000", // 备选默认值
    },
  },
  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: "Ui",
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: "@/components/ui",
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      title: "英语单词学习",
      htmlAttrs: {
        lang: "zh-CN",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "在线学习英语单词平台",
        },
        { name: "keywords", content: "英语单词学习平台" },
        // Open Graph
        { property: "og:type", content: "website" },
        { property: "og:title", content: "英语单词学习" },
        {
          property: "og:description",
          content: "在线学习英语单词平台",
        },
        { property: "og:site_name", content: "英语单词学习" },
        // Twitter Card
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "英语单词学习" },
        {
          name: "twitter:description",
          content: "在线学习英语单词平台",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  vite: {
    plugins: [codeInspectorPlugin({ bundler: "vite" })],
  },
});
