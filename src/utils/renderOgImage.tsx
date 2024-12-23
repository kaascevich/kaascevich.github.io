import { SITE } from "../config";
import type { RenderFunctionInput } from "astro-opengraph-images";

/**
 * Renders an Open Graph image.
 * @param input - The function's parameters.
 * @param input.title - The page's title.
 * @param input.description - The page's description.
 * @returns A promise containing the rendered image.
 */
export default async function renderOgImage(
  { title, description }: RenderFunctionInput
): Promise<React.ReactNode> {
  const articleTitle = title.replace(` | ${SITE.title}`, "");

  return Promise.resolve(
    <div style={{
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#303446",
      padding: "55px 70px",
      color: "#c6d0f5",
      fontFamily: "Recursive",
      fontSize: 72,
    }}>
      <div style={{ color: "#8caaee" }}>
        {articleTitle}
      </div>
      <div style={{ fontSize: 40 }}>
        {description ?? ""}
      </div>
    </div>
  );
}
