import type { NodeType } from "../types";
import * as R from "ramda";
import ellipse from "../elements/ellipse";
import rectangle from "../elements/rectangle";
import position from "../styles/position";
import styles from '../styles';
import * as parser from "../parser";
export default (item: NodeType) => {
  const { id, name, children = [], absoluteBoundingBox } = item;

  //* 그룹 테스트를 조금 더 해야함.

  //* 사각형이 있는지 확인
  const index = R.findIndex(
    (child: NodeType) => child.type === "RECTANGLE" || child.type === "ELLIPSE"
  )(children);

  if (index === -1) {
    return {
      key: id,
      tagName: "div",
      style: styles(item),
      children,
      ...parser.getAttributes(name),
    };
  }

  let alter: any = null;
  if (children[index].type === "RECTANGLE") {
    alter = rectangle(children[index] as NodeType);
  } else {
    alter = ellipse(children[index] as NodeType);
  }
  alter.name = name;
  alter.style["position"] = "relative";
  alter.children = R.pipe(
    R.remove(index, 1) as any,
    R.map((v: NodeType) => {
      return R.mergeDeepLeft({ style: {position: 'absolute', ...position(v, absoluteBoundingBox)} })(v);
    })
  )(children);

  return {
    key: id,
    ...alter,
    tagName: "div",
    ...parser.getAttributes(name),
  };
};
