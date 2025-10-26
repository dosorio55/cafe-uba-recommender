"use server";

import MainAgent from "@/global/agents/main-agent";
import z from "zod";
import coffeeCategories from "@/global/agents/categories";

const CoffeeCategorySchema = z.object({
  process: z.array(z.enum(coffeeCategories.process)).min(1),
  variety: z.array(z.enum(coffeeCategories.variety)).min(1),
  flavor_tags: z.array(z.enum(coffeeCategories.flavor_tags)).min(1),
  body: z.array(z.enum(coffeeCategories.body)).min(1),
  acidity: z.array(z.enum(coffeeCategories.acidity)).min(1),
  mood_tags: z.array(z.enum(coffeeCategories.mood_tags)).min(1),
  expected_flavor: z.array(z.enum(coffeeCategories.expected_flavor)).min(1),
  notes: z.array(z.enum(coffeeCategories.notes)).min(1),
  reply: z.string().min(1),
});

class BaristaAgent extends MainAgent {
  schema = CoffeeCategorySchema;

  async loadInstructions() {
    if (this.instructions) return this.instructions;
    return super.loadInstructions("barista-agent.instructions.md");
  }

  async runGenerateText(prompt: string) {
    return await super.runGenerateText(prompt, await this.loadInstructions());
  }

  async runGenerateObject(prompt: string) {
    return (await super.runGenerateObject(
      prompt,
      this.schema,
      await this.loadInstructions()
    )) as z.infer<typeof this.schema>;
  }
}

export type CoffeeCategory = z.infer<typeof CoffeeCategorySchema>;

export default BaristaAgent;
