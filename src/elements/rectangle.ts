import * as parser from "../parser";
import type { NodeType } from "../types";

export default (item: NodeType) => {
  const { id, name } = item;

  // console.log(item);
  return {
    key: id,
    tagName: "div",
    style: parser.getStyles(item),
    ...parser.getAttributes(name),
  };
};
