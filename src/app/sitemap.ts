import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://example.com";
  return [
    { url: `${base}/`, priority: 1, changeFrequency: "weekly" },
    { url: `${base}/users`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${base}/settings`, priority: 0.5, changeFrequency: "yearly" },
  ];
}


