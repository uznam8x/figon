import * as R from "ramda";
import type { NodeType } from "../types";
export default (item: NodeType) => {
  const {
    styles = {},
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
  } = item;

  if (!R.isNil(paddingLeft)) styles["paddingLeft"] = paddingLeft;
  if (!R.isNil(paddingRight)) styles["paddingRight"] = paddingRight;
  if (!R.isNil(paddingTop)) styles["paddingTop"] = paddingTop;
  if (!R.isNil(paddingBottom)) styles["paddingBottom"] = paddingBottom;

  return styles;
};

