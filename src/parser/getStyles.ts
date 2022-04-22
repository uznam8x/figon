import * as R from "ramda";
import getRgba from "./getRgba";
import getBorderRadius from "./getBorderRadius";
export default (item: any) => {
  const {
    cornerRadius,
    rectangleCornerRadii,
    fills = [],
    layoutMode,
    itemSpacing,
    counterAxisAlignItems,
    primaryAxisAlignItems,
    primaryAxisSizingMode,
    style,
    layoutGrow,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
  } = item;
  const styles: any = {};

  // flex
  if (!R.isNil(layoutMode)) {
    const flex: any = {
      display: "flex",
      flexDirection: layoutMode.toUpperCase() === "VERTICAL" ? "column" : "row",
      gap: itemSpacing || 0,
      alignItems:
        (
          {
            CENTER: "center",
            MAX: "flex-end",
          } as any
        )[counterAxisAlignItems || ""] || "flex-start",
      justifyContent:
        (
          {
            SPACE_BETWEEN: "space-between",
            CENTER: "center",
            MAX: "flex-end",
          } as any
        )[primaryAxisAlignItems || ""] || "flex-start",
    };

    for (let key in flex) {
      styles[key] = flex[key];
    }
  }
  if (!!layoutGrow) styles["flexGrow"] = layoutGrow;

  if (!R.isNil(primaryAxisSizingMode) && primaryAxisSizingMode === "FIXED") {
    styles["flexGrow"] = 1;
  }

  // background
  if (!!fills.length) {
    styles["backgroundColor"] = getRgba(fills[0].color);
  }

  // border
  if (!R.isNil(cornerRadius)) {
    const radius: any = getBorderRadius(rectangleCornerRadii || cornerRadius);
    for (let key in radius) {
      styles[key] = radius[key];
    }
  }

  if (!R.isNil(paddingLeft)) styles["paddingLeft"] = paddingLeft;
  if (!R.isNil(paddingRight)) styles["paddingRight"] = paddingRight;
  if (!R.isNil(paddingTop)) styles["paddingTop"] = paddingTop;
  if (!R.isNil(paddingBottom)) styles["paddingBottom"] = paddingBottom;

  //* font
  if (!R.isNil(style)) {
    styles["fontWeight"] = style["fontWeight"];
    styles["fontSize"] = style["fontSize"];
    styles["lineHeight"] = Math.round(style["lineHeightPx"]) + "px";
    styles["textAlign"] = style["textAlignHorizontal"].toLowerCase();
  }

  return styles;
};
