import * as parser from "../parser";
import styles from '../styles';
import type { NodeType } from "../types";
export default (item: NodeType) => {
  const { id, name, children } = item;


  

  return {
    key: id,
    tagName: "div",
    style: styles(item),
    children,
    ...parser.getAttributes(name),
  };
};
