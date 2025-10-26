import { CoffeeCategory } from "@/global/agents/barista-agent/barista-agent";

export type Price = {
  regular?: string;
  sale?: string;
};

export type CoffeeProduct = {
  name?: string;
  url?: string;
  images: string[];
  price: Price;
};

export interface CoffeeCategoryScores {
  process: number;
  variety: number;
  flavor_tags: number;
  body: number;
  acidity: number;
  mood_tags: number;
  expected_flavor: number;
  notes: number;
}
