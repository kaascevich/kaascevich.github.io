import Giscus from "@giscus/react";
import { GISCUS } from "@config";
import { useEffect, useState } from "react";

const lightTheme = "https://giscus.catppuccin.com/themes/latte-no-loader.css";
const darkTheme = "https://giscus.catppuccin.com/themes/macchiato-no-loader.css";

export default function Comments() {
  const [theme, setTheme] = useState(() => {
    const currentTheme = localStorage.getItem("theme");
    const browserTheme = matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

    return currentTheme ?? browserTheme;
  });

  useEffect(() => {
    const mediaQuery = matchMedia("(prefers-color-scheme: dark)");
    const handleChange = ({ matches }: MediaQueryListEvent) => {
      setTheme(matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const themeButton = document.querySelector("#theme-btn");
    const handleClick = () =>
      setTheme(prevTheme => prevTheme === "dark" ? "light" : "dark");

    themeButton?.addEventListener("click", handleClick);

    return () => themeButton?.removeEventListener("click", handleClick);
  }, []);

  return <div className="mt-8">
    <Giscus theme={theme === "light" ? lightTheme : darkTheme} {...GISCUS}/>
  </div>;
}
