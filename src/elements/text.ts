import * as parser from "../parser";
import type { NodeType } from "../types";
export default (item: NodeType) => {
  const { id, name, type, characters = "" } = item;
  const styles = parser.getStyles(item);

  if (!!styles["backgroundColor"]) {
    styles["color"] = styles["backgroundColor"];
    delete styles["backgroundColor"];
  }

  return {
    key: id,
    type,
    tagName: "span",
    textContent: characters,
    style: styles,
    ...parser.getAttributes(name),
  };
};
