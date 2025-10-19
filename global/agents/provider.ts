import type { LanguageModel } from "ai";
import { createGeminiProvider } from "ai-sdk-provider-gemini-cli";
import { GOOGLE_GENERATIVE_AI_API_KEY } from "@/config/env.config";
import { logger } from "@/app/api/logger/logger";

type ModelInfo = { name: string; price?: { input: number; output: number } };
type ProviderMap = {
  gemini: Record<string, ModelInfo>;
  openai: Record<string, ModelInfo>;
  anthropic: Record<string, ModelInfo>;
};

export const AI_VARIANTS: ProviderMap = {
  gemini: {
    "gemini-2.5-flash": {
      name: "gemini-2.5-flash",
      price: { input: 0.3, output: 2.5 },
    },
    "gemini-2.5-flash-lite": {
      name: "gemini-2.5-flash-lite",
      price: { input: 0.1, output: 0.4 },
    },
  },
  openai: {
    "gpt-4o": {
      name: "gpt-4o",
    },
    "gpt-4o-mini": {
      name: "gpt-4o-mini",
    },
  },
  anthropic: {
    "claude-3-5-sonnet": {
      name: "claude-3-5-sonnet",
    },
    "claude-3-5-haiku": {
      name: "claude-3-5-haiku",
    },
  },
};

export type AIProviderType = keyof typeof AI_VARIANTS;
export type AIModel = string;

const checkModelVariant = (
  provider: AIProviderType,
  variant: AIModel | undefined
): AIModel => {
  if (variant && !AI_VARIANTS[provider][variant]) {
    throw new Error(`Invalid variant: ${variant}`);
  }

  const selectedVariant = variant || Object.keys(AI_VARIANTS[provider])[0];

  if (!variant) {
    logger.info(`No variant specified, using default: ${selectedVariant}`);
  }

  return selectedVariant;
};

export function getAIProvider(
  provider: AIProviderType = "gemini",
  variant?: AIModel
): {
  model: LanguageModel;
  costPerInputToken: number;
  costPerOutputToken: number;
} {
  const variantModel = checkModelVariant(provider, variant);

  let costPerInputToken = 0;
  let costPerOutputToken = 0;

  if (AI_VARIANTS[provider][variantModel].price) {
    costPerInputToken =
      AI_VARIANTS[provider][variantModel].price.input / 1_000_000;
    costPerOutputToken =
      AI_VARIANTS[provider][variantModel].price.output / 1_000_000;
  }

  switch (provider) {
    case "gemini": {
      const gemini = createGeminiProvider({
        authType: "api-key",
        apiKey: GOOGLE_GENERATIVE_AI_API_KEY,
      });

      return {
        model: gemini(variantModel),
        costPerInputToken,
        costPerOutputToken,
      };
    }
    case "openai": {
      throw new Error("OpenAI provider not installed");
    }
    case "anthropic": {
      throw new Error("Anthropic provider not installed");
    }
  }
}
