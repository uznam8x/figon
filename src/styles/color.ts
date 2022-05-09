import type { NodeType } from "../types";
import rgba from "../utils/rgba";
export default (item: NodeType) => {
  const { styles = {}, fills = [] } = item;
  styles["color"] = rgba(fills[0].color);
  return styles;
};
