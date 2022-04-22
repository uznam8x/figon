import * as R from "ramda";
import elements from "../elements";
import type { NodeType, OffsetType } from "../types";

function node(item: NodeType, bounding: OffsetType) {
  const type = item.type.toLowerCase();
  if (!(elements as any)[type]) return null;

  const element = (elements as any)[type](item);
  if (R.isNil(element)) {
    return null;
  }

  const { absoluteBoundingBox } = item;

  //* Postion
  const offset: OffsetType = {
    ...absoluteBoundingBox,
    x: absoluteBoundingBox.x - bounding.x,
    y: absoluteBoundingBox.y - bounding.y,
  };

  const relativePosition = {
    ...bounding,
    x: bounding.x + offset.x,
    y: bounding.y + offset.y,
  };

  const res: any = Object.assign(element, {
    offset,
    children: R.pipe(
      R.map((v: any) =>
        //* Absolute postion to Relative position
        node(v, relativePosition)
      ),
      R.reject(R.isNil),
      R.sort((a: any, b: any) =>
        //* element order
        a.offset.x + a.offset.y < b.offset.x + b.offset.y ? -1 : 1
      )
    )(element.children || []),
  });

  return res;
}

export default node;
