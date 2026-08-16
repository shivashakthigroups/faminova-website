import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",

        disallow: [
          "/admin/",
          "/api/",
          "/dashboard",
          "/profile",
          "/payments",
          "/payment/",
          "/login",
          "/register",
          "/forgot-password",
          "/reset-password",
        ],
      },
    ],

    sitemap:
      "https://faminova.in/sitemap.xml",
  };
}