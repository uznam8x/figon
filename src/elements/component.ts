import type { NodeType } from "../types";
import * as parser from "../parser";
export default (item: NodeType) => {
  const { id, name, children } = item;

  return {
    key: id,
    tagName: "div",
    children,
    ...parser.getAttributes(name),
  };
};
