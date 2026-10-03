import { version } from "../../package.json";
import { defineDocsConfig } from "./shared/docs";

export default defineDocsConfig({
  name: "spiget-js",
  description: "A framework-agnostic fully typed JavaScript client for the Spiget API.",
  repo: "creeperkatze/spiget-js",
  version,
  guide: [
    { text: "Getting Started", link: "/guide/getting-started" },
    { text: "Error Handling", link: "/guide/error-handling" },
    { text: "Custom Fetch", link: "/guide/custom-fetch" },
    { text: "Resources", link: "/guide/resources" },
    { text: "Authors & Categories", link: "/guide/authors" },
    { text: "Reviews, Updates & Versions", link: "/guide/reviews" },
    { text: "Pagination", link: "/guide/pagination" },
    { text: "Webhooks", link: "/guide/webhooks" },
  ],
  api: new URL("../api", import.meta.url),
});
