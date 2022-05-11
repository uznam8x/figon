import * as R from "ramda";
import backgroundImage from "./backgroundImage";
import borderRadius from "./borderRadius";
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

  return R.omit(["fills", "fill"], styles);
};
