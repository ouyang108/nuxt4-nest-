<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod"
import * as z from "zod"
import { User, Lock } from "lucide-vue-next"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const validationSchema = toTypedSchema(
  z.object({
    phone: z
      .string()
      .min(1, "请输入手机号")
      .regex(/^1[3-9]\d{9}$/, "请输入正确的手机号"),
    password: z.string().min(1, "请输入密码").min(6, "密码至少6位"),
  }),
)

const handleLogin = (values: Record<string, any>) => {
  console.log("login", values)
}
</script>

<template>
  <div class="mb-8">
    <h1 class="text-3xl font-bold text-gray-800 mb-2">欢迎回来</h1>
    <p class="text-gray-500 text-sm">请登录您的账户以继续</p>
  </div>

  <Form :validation-schema="validationSchema" class="space-y-6" @submit="handleLogin">
    <FormField name="phone" v-slot="{ componentField }">
      <FormItem>
        <FormLabel>手机号</FormLabel>
        <FormControl>
          <div class="relative">
            <User class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              v-bind="componentField"
              placeholder="请输入手机号"
              maxlength="11"
              class="h-12 pl-9"
            />
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField name="password" v-slot="{ componentField }">
      <FormItem>
        <FormLabel>密码</FormLabel>
        <FormControl>
          <div class="relative">
            <Lock class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              v-bind="componentField"
              type="password"
              placeholder="请输入密码"
              class="h-12 pl-9"
            />
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="pt-4">
      <Button
        type="submit"
        class="w-full h-12 text-base font-semibold bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-0"
      >
        登录
      </Button>
    </div>
  </Form>
</template>

<style lang="scss" scoped></style>
