import styles from "@/styles/modules/Comments.module.sass";
import Giscus from "@giscus/react";
import { GISCUS } from "@/config";
import { useEffect, useState } from "react";

/** A CSS file containing light theme styles. */
const lightTheme = "https://giscus.catppuccin.com/themes/latte-no-loader.css";
/** A CSS file containing dark theme styles. */
const darkTheme = "https://giscus.catppuccin.com/themes/macchiato-no-loader.css";

/** A comments section for blog posts. */
export default function Comments() {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem("theme")
      ?? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );

  useEffect(() => {
    const mediaQuery = matchMedia("(prefers-color-scheme: dark)");
    const handleChange = ({ matches }: MediaQueryListEvent) => setTheme(matches ? "dark" : "light");

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const themeButton = document.getElementById("theme-button");
    const handleClick = () => setTheme(prevTheme => prevTheme === "dark" ? "light" : "dark");

    themeButton?.addEventListener("click", handleClick);
    return () => themeButton?.removeEventListener("click", handleClick);
  }, []);

  return <div className={styles["comments"]}>
    <Giscus theme={theme === "light" ? lightTheme : darkTheme} {...GISCUS}/>
  </div>;
}
