import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().min(1, "NEXT_PUBLIC_APP_URL is required"),
  GOOGLE_GENERATIVE_AI_API_KEY: z
    .string()
    .min(1, "GOOGLE_GENERATIVE_AI_API_KEY is required"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const formatted = parsed.error.format() as Record<string, any>;
  const details = Object.entries(formatted)
    .filter(([key]) => key !== "_errors")
    .map(([key, val]) => {
      const errs = Array.isArray(val?._errors) ? val._errors.join(", ") : "";
      return errs ? `${key}: ${errs}` : "";
    })
    .filter(Boolean)
    .join("\n");

  const message = `Error parsing environment variables\n${details}`;
  console.error("❌", message);
  // Throw instead of process.exit to remain compatible with Edge runtime
  throw new Error(message);
}

export const { NEXT_PUBLIC_APP_URL, GOOGLE_GENERATIVE_AI_API_KEY } =
  parsed.data;
