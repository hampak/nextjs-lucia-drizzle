import { z } from "zod";

export const LoginUserSchema = z.object({
  username: z.string().min(1, {
    message: "Please type in your username"
  }),
  password: z.string().min(1, {
    message: "Please type in your password"
  })
})

export const RegisterUserSchema = z.object({
  username: z.string().min(5, {
    message: "Your username should be longer than 5 characters"
  }),
  password: z.string().min(8, {
    message: "Your password should be longer than 8 characters"
  })
})