import type { NodeType } from "../types";
import rgba from "../utils/rgba";
export default (item: NodeType) => {
  const { styles = {}, strokes = [], strokeAlign, strokeWeight } = item;

  if (!!strokes.length) {
    const align = strokeAlign === "INSIDE" ? "inset " : "";
    styles["boxShadow"] = `${align}${(strokes || [])
      .map((stroke: any) => {
        return `0 0 0 ${strokeWeight}px ${rgba({
          ...stroke.color,
          a: stroke.opacity || stroke.color.a,
        })}`;
      })
      .join(", ")}`;
  }
  return styles;
};
