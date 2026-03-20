import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NVD Portofoliu Imobiliar",
    short_name: "NVD Imobiliar",
    description:
      "Portofoliu web pentru dezvoltatori imobiliari din România, axat pe conversii și prezentare premium.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
