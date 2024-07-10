import { z } from "zod";

const loginFormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 5 characters.",
  }),
});

const carFormSchema = z.object({
  model: z.string().min(1, {
    message: "Model is required.",
  }),
  price: z.number().min(0, {
    message: "Price must be a positive number.",
  }),
  phone: z.string().regex(/^\d{11}$/, {
    message: "Phone number must be exactly 11 digits.",
  }),
});

const loginDefaultValues: z.infer<typeof loginFormSchema> = {
  email: "",
  password: "",
};

const carDefaultValues: z.infer<typeof carFormSchema> = {
  model: "",
  price: 0,
  phone: "",
};

export { loginFormSchema, loginDefaultValues, carFormSchema, carDefaultValues };
