import type { ColorType } from "../types";
export default (color: ColorType): string => {
  if (!color) return "";
  const { r, g, b, a = 0 } = color;
  const value = [r, g, b].map((v) => Math.round(255 * v)).join(", ");
  return `rgba(${value}, ${a})`;
};
