import type { NodeType } from "../types";
import * as R from "ramda";
import ellipse from "../elements/ellipse";
import rectangle from "../elements/rectangle";
import * as parser from "../parser";
export default (item: NodeType) => {
  const { id, name, children = [] } = item;

  //* 그룹 테스트를 조금 더 해야함.

  //* 사각형이 있는지 확인
  const index = R.findIndex(
    (child: NodeType) => child.type === "RECTANGLE" || child.type === "ELLIPSE"
  )(children);

  if (index === -1) {
    return {
      key: id,
      tagName: "div",
      style: parser.getStyles(item),
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
  alter.children = R.remove(index, 1)(children) as NodeType[];

  return {
    key: id,
    ...alter,
    tagName: "div",
    ...parser.getAttributes(name),
  };
};
