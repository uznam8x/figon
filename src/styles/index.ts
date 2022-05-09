import * as R from "ramda";
import backgroundImage from "./backgroundImage";
import border from "./border";
import color from "./color";
import effect from "./effect";
import flex from "./flex";
import font from "./font";
import padding from "./padding";
export default (item: any) => {
  const { type } = item;

  const styles = R.pipe(
    R.map((v: any) => v(item)),
    R.reduce(R.mergeRight, {} as any)
  )([
    flex,
    type === "TEXT" ? color : backgroundImage,
    effect,
    border,
    padding,
    font,
  ]);

  return styles;
};
