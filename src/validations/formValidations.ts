import { z } from "zod";
import { email, password } from "./common";


export const hrFormSchema = z.object({
    email: email,
    password: password,
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    roleId: z.coerce.number().int("Role ID must be an integer").positive("Role ID must be a positive number")
});