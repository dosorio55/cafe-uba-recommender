import { generateObject, generateText, LanguageModel, Tool } from "ai";
import z from "zod";
import { AIModel, AIProviderType, getAIProvider } from "./provider";
import { tokenUsage } from "@/global/agents/token-usage";
import { NEXT_PUBLIC_APP_URL } from "@/config/env.config";
import { logger } from "@/app/api/logger/logger";

class MainAgent {
  instructions = "";
  tools: Tool[] = [];
  memory: string[] = [];
  model: LanguageModel;
  costPerInputToken = 0;
  costPerOutputToken = 0;

  constructor({
    AIProviderType,
    variant,
  }: {
    AIProviderType?: AIProviderType;
    variant?: string;
  } = {}) {
    const { model, costPerInputToken, costPerOutputToken } = getAIProvider(
      AIProviderType,
      variant as AIModel
    );
    this.model = model;
    this.costPerInputToken = costPerInputToken;
    this.costPerOutputToken = costPerOutputToken;
  }

  async loadInstructions(fileName: string): Promise<string> {
    const base = NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    try {
      const res = await fetch(new URL(`/instructions/${fileName}`, base));
      if (!res.ok) {
        console.error("Failed to load instructions");
        throw new Error("Failed to load instructions");
      }
      this.instructions = await res.text();
      return this.instructions;
    } catch (error) {
      console.error("Failed to load instructions", error);
      throw error;
    }
  }

  async runGenerateText(prompt: string, instructions?: string) {
    let lastError: unknown;

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const { text, usage } = await generateText({
          model: this.model,
          prompt: instructions ? `${instructions}\n\n${prompt}` : prompt,
        });

        if (usage?.totalTokens) {
          tokenUsage.addUsage(
            this.constructor.name,
            usage.inputTokens || 0,
            usage.outputTokens || 0,
            this.costPerInputToken,
            this.costPerOutputToken
          );
        }

        logger.info(`Usage: ${usage.totalTokens}`);
        return text;
      } catch (err) {
        lastError = err;
        logger.error(
          `Error generating text: ${err} in agent ${this.constructor.name}`,
          { __ctx: true, scope: "main-agent", method: "runGenerateText" }
        );
        if (attempt === 3) break;
        await new Promise((r) => setTimeout(r, 200 * attempt));
      }
    }

    throw lastError;
  }

  async runGenerateObject(
    prompt: string,
    schema: z.ZodType<any>
  ): Promise<z.infer<typeof schema>> {
    let lastError: unknown;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        logger.info(`Generating object with agent ${this.constructor.name}`);

        const { object: response, usage } = await generateObject({
          model: this.model,
          schema: schema as any,
          prompt,
        });

        logger.info(`Generated object with agent ${JSON.stringify(response)}`);

        if (usage?.totalTokens) {
          tokenUsage.addUsage(
            this.constructor.name,
            usage.inputTokens || 0,
            usage.outputTokens || 0,
            this.costPerInputToken,
            this.costPerOutputToken
          );
        }

        logger.info(`Usage: ${usage.totalTokens}`);
        return response;
      } catch (err) {
        lastError = err;
        logger.error(
          `Error generating object: ${err} in agent ${this.constructor.name}`,
          { __ctx: true, scope: "main-agent", method: "runGenerateObject" }
        );
        if (attempt === 3) break;
        await new Promise((r) => setTimeout(r, 300 * attempt));
        continue;
      }
    }
    throw lastError;
  }

  async runAgentWithContent(prompt: string) {
    return await this.runGenerateText(prompt);
  }

  private toDataUrl(
    data: string | ArrayBuffer | Uint8Array | Buffer,
    mediaType: string
  ): string {
    let base64: string;
    if (typeof data === "string") {
      if (data.startsWith("data:")) return data;
      base64 = Buffer.from(data).toString("base64");
    } else if (data instanceof ArrayBuffer) {
      base64 = Buffer.from(new Uint8Array(data)).toString("base64");
    } else if (data instanceof Uint8Array) {
      base64 = Buffer.from(data).toString("base64");
    } else {
      base64 = Buffer.from(data as any).toString("base64");
    }
    return `data:${mediaType};base64,${base64}`;
  }

  async runGenerateObjectWithFiles({
    prompt,
    files,
    schema,
    instructions,
  }: {
    prompt: string;
    files: Array<{
      data: string | ArrayBuffer | Uint8Array | Buffer;
      mediaType: string;
    }>;
    schema: z.ZodType<any>;
    instructions?: string;
  }): Promise<z.infer<typeof schema>> {
    let lastError: unknown;

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const contents: any[] = [];
        const fullPrompt = instructions
          ? `${instructions}\n\n${prompt}`
          : prompt;

        contents.push({ type: "text", text: fullPrompt });

        for (const file of files) {
          const raw = (file.mediaType || "").toLowerCase();
          const mediaType =
            raw && raw !== "application/octet-stream" ? raw : "audio/mpeg";
          contents.push({
            type: "file",
            data: this.toDataUrl(file.data, mediaType),
            mediaType,
          });
        }

        const { object: response, usage } = await generateObject({
          model: this.model,
          schema: schema as any,
          messages: [
            {
              role: "user",
              content: contents,
            },
          ],
        });

        if (usage?.totalTokens) {
          tokenUsage.addUsage(
            this.constructor.name,
            usage.inputTokens || 0,
            usage.outputTokens || 0,
            this.costPerInputToken,
            this.costPerOutputToken
          );
        }

        logger.info(`Usage: ${usage.totalTokens}`);
        return response as any;
      } catch (err) {
        lastError = err;
        logger.error(
          `Error generating object with files: ${err} in agent ${this.constructor.name}`,
          {
            __ctx: true,
            scope: "main-agent",
            method: "runGenerateObjectWithFiles",
          }
        );
        if (attempt === 3) break;
        await new Promise((r) => setTimeout(r, 300 * attempt));
        continue;
      }
    }
    throw lastError;
  }
}

export default MainAgent;
