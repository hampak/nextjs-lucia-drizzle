"use client";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { LoginUserSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";


export const Login = () => {

  const [isPending, startTransition] = useTransition()

  const form = useForm({
    resolver: zodResolver(LoginUserSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  })

  const onSubmit = (values: z.infer<typeof LoginUserSchema>) => {
    startTransition(() => {
    })
  }

  return (
    <div className="w-[500px] border border-black/20 shadow-lg rounded-lg p-4">
      <h1 className="text-xl font-bold text-center mt-1">Sign in to ______</h1>
      <h2 className="text-sm font-semibold text-center mt-2 text-gray-500">Welcome Back :D</h2>
      <div className="mt-5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="enter username..."
                      type="text"
                      className="focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="enter password..."
                      type="password"
                      className="focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <Button
              className="w-full"
              disabled={isPending}
            >
              {
                isPending ?
                  <>
                    <Loader2Icon className="w-4 h-4 animate-spin mr-2" /> Login
                  </>
                  : "Login"
              }
            </Button>
          </form>
        </Form>
      </div>
      <p className="text-center mt-3 text-xs">Don&apos;t have an account? <Link className="underline underline-offset-1 hover:text-gray-600" href="/signup">Sign Up</Link></p>
    </div >
  )
}

export default Login