export type ScrapedPrice = {
  regular?: string;
  sale?: string;
};

export type ScrapedProduct = {
  name?: string;
  url?: string;
  images: string[];
  price: ScrapedPrice;
};
