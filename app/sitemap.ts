import { MetadataRoute } from "next";
import { foods, outlets } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    {
      url: "https://sajiin.vercel.app",
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
  ];

  const foodPages = foods.map((food) => ({
    url: `https://sajiin.vercel.app/?menu=${food.food_id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...foodPages];
}
