import type { NodeType } from "../types";
import * as R from "ramda";
import rectangle from "../elements/rectangle";
import * as parser from "../parser";
export default (item: NodeType) => {
  const { id, name, type, children = [], layoutGrow = 0 } = item;

  //* 그룹 테스트를 조금 더 해야함.

  //* 사각형이 있는지 확인
  const index = R.findIndex((child: NodeType) => child.type === "RECTANGLE")(
    children
  );
  if (index === -1) return null;

  const alter: any = rectangle(children[index] as NodeType);
  alter.name = name;
  alter.children = R.remove(index, 1)(children) as NodeType[];

  const styles: any = {};
  if (!!layoutGrow) styles["flexGrow"] = layoutGrow;

  return {
    key: id,
    ...alter,
    type,
    tagName: "div",
    style: { ...styles, ...(alter.style || {}) },
    ...parser.getAttributes(name),
  };
};
