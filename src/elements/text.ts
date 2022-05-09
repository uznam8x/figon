import * as parser from "../parser";
import styles from "../styles";
import type { NodeType } from "../types";
export default (item: NodeType) => {
  const { id, name, characters = "" } = item;

  return {
    key: id,
    tagName: "span",
    textContent: characters,
    style: styles(item),
    ...parser.getAttributes(name),
  };
};
