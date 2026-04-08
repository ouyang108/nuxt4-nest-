<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { User, Lock, Mail } from "lucide-vue-next";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const validationSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, "请输入用户名"),
    phone: z
      .string()
      .min(1, "请输入手机号")
      .regex(/^1[3-9]\d{9}$/, "请输入正确的手机号"),
    email: z.string().email("请输入正确的邮箱").optional().or(z.literal("")),
    password: z.string().min(1, "请输入密码").min(6, "密码至少6位"),
  }),
);

const emit = defineEmits(["register"]);
const handleRegister = (values: Record<string, any>) => {
  emit("register", values);
};
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">欢迎注册</h1>
      <p class="text-gray-500 text-sm">请填写以下信息以完成注册</p>
    </div>

    <Form
      :validation-schema="validationSchema"
      class="space-y-6"
      @submit="handleRegister"
    >
      <FormField name="name" v-slot="{ componentField }">
        <FormItem>
          <FormLabel>用户名</FormLabel>
          <FormControl>
            <div class="relative">
              <User
                class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
              />
              <Input
                v-bind="componentField"
                placeholder="请输入用户名"
                class="h-12 pl-9"
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField name="phone" v-slot="{ componentField }">
        <FormItem>
          <FormLabel>手机号</FormLabel>
          <FormControl>
            <div class="relative">
              <User
                class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
              />
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

      <FormField name="email" v-slot="{ componentField }">
        <FormItem>
          <FormLabel>邮箱（可选）</FormLabel>
          <FormControl>
            <div class="relative">
              <Mail
                class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
              />
              <Input
                v-bind="componentField"
                placeholder="请输入邮箱(可选)"
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
              <Lock
                class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
              />
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
          注册
        </Button>
      </div>
    </Form>
  </div>
</template>

<style lang="scss" scoped></style>
