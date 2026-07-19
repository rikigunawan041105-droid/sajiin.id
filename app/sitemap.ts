import { MetadataRoute } from "next";
import { foods } from "@/lib/data";

const BASE_URL = "https://sajiin.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
  ];

  const foodPages = foods.map((food) => ({
    url: `${BASE_URL}/?menu=${food.food_id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...foodPages];
}
