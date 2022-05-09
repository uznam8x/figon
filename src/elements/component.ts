import type { NodeType } from "../types";
import styles from "../styles";
import * as parser from "../parser";
export default (item: NodeType) => {
  const { id, name, children } = item;

  return {
    key: id,
    tagName: "div",
    children,
    style: styles(item),
    ...parser.getAttributes(name),
  };
};
