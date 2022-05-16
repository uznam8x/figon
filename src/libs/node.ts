import * as R from "ramda";
import elements from "../elements";
import type { NodeType, OffsetType } from "../types";

function round(a: any, b: any) {
  const [key, value] = b;
  return { ...a, [key]: Math.round(value) };
}

function node(item: NodeType, bounding: OffsetType) {
  const type = item.type.toLowerCase();
  if(item.visible === false) return null;
  if (!(elements as any)[type]) return null;

  const element = (elements as any)[type](item);
  if (R.isNil(element)) {
    return null;
  }

  const { absoluteBoundingBox } = item;

  //* Postion
  const offset: OffsetType = Object.entries({
    ...absoluteBoundingBox,
    x: absoluteBoundingBox.x - bounding.x,
    y: absoluteBoundingBox.y - bounding.y,
  }).reduce(round, {});

  const relativePosition = Object.entries({
    ...bounding,
    x: bounding.x + offset.x,
    y: bounding.y + offset.y,
  }).reduce(round, {});

  const res: NodeType = Object.assign(element, {
    offset,
    children: R.pipe(
      R.map((v: any) =>
        //* Absolute postion to relative position
        node(v, relativePosition)
      ),
      R.reject(R.isNil),
      R.sort((a: any, b: any) =>
        //* element order from y
        a.offset.x + a.offset.y < b.offset.x + b.offset.y ? -1 : 1
      )
    )(element.children || []),
  });

  return res;
}

export default node;
