import { z } from "zod";

export const signInScheme = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Senha muito curta"),
});

export const signUpScheme = z.object({
  username: z.string().min(2, "Nome muito curto"),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Senha muito curta, mínimo de 8 caracteres"),
});
