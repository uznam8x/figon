import * as parser from "../parser";
import type { NodeType } from "../types";
export default (item: NodeType) => {
  const { id, name } = item;

  return {
    key: id,
    tagName: "svg",
    ...parser.getAttributes(name),
  };
};
