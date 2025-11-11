import { z } from 'zod'
import type {User} from "~/models/user.models";
//import type { User } from './user.model'
export const loginSchema = z.object({
    username: z
        .string()
        .min(1, { message: 'Потребителското име е задължително.' }),
    password: z
        .string()
        .min(4, { message: 'Паролата трябва да е поне 4 символа.' })

})
export type LoginData = z.infer<typeof loginSchema>

export type LoginResponse = {
    user: User
    token: string
}