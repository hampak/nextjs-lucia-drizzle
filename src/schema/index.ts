import { z } from "zod";

export const LoginUserSchema = z.object({
  username: z.string().min(1, {
    message: "Please type in your username"
  }),
  password: z.string().min(1, {
    message: "Please type in your password"
  })
})