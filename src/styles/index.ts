import * as R from "ramda";
import backgroundImage from "./backgroundImage";
import borderRadius from "./borderRadius";
import border from "./border";
import color from "./color";
import effect from "./effect";
import flex from "./flex";
import font from "./font";
import padding from "./padding";
import shorthand from "./shorthand";
import { selector } from "../parser/getAttributes";

const alias = (items = {}) => {
  return Object.entries(items)
    .map((entry) => {
      const [key, value] = entry as any;
      if (R.has(key, shorthand)) {
        return (shorthand[key] as any)(value);
      }
    })
    .reduce((a, b) => ({ ...a, ...b }), {});
};

export const inlineStyle = (syntax: string) => {
  const matched = selector(syntax);
  if (!!matched) {
    const { style } = matched.groups as any;
    if (!style) return {};

    const inline = style
      .replace(/[\{\}]/g, "")
      .split(",")
      .reduce((a: any, b: any) => {
        const [key, value = ""] = b.split("=");
        return { ...a, [key.trim()]: value.trim().replace(/['"]/g, "") };
      }, {});
    return !!Object.keys(inline).length ? alias(inline) : {};
  }
  return {};
};

export default (item: any) => {
  const { type, name } = item;

  const styles = R.pipe(
    R.map((v: any) => v(item)),
    R.reduce(R.mergeDeepRight, {} as any)
  )([
    flex,
    type === "TEXT" ? color : backgroundImage,
    effect,
    border,
    borderRadius,
    padding,
    font,
  ]);

  const res = { ...styles, ...inlineStyle(name) };

  return R.omit(["fills", "fill"], res);
};
