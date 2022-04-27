import * as R from "ramda";
import getRgba from "./getRgba";
import getBorderRadius from "./getBorderRadius";
export default (item: any) => {
  const {
    type,
    cornerRadius,
    rectangleCornerRadii,
    fills = [],
    effects = [],
    layoutMode,
    itemSpacing,
    // counterAxisSizingMode,
    // primaryAxisSizingMode,
    counterAxisAlignItems,
    primaryAxisAlignItems,
    style,
    strokes = [],
    strokeWeight,
    strokeAlign,
    layoutGrow,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
    layoutAlign,
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
      if (key === "gap" && flex[key] === 0) continue;
      if (key === "alignItems" && flex[key] === "flex-start") continue;
      if (key === "justifyContent" && flex[key] === "flex-start") continue;
      if (key === "flexDirection" && flex[key] === "row") continue;
      styles[key] = flex[key];
    }
  }
  if (!!layoutGrow) {
    styles["flexGrow"] = layoutGrow;
  }

  /* if (!R.isNil(primaryAxisSizingMode) && primaryAxisSizingMode === "FIXED") {
    styles["height"] = "100%";
  }

  if (!R.isNil(counterAxisSizingMode) && counterAxisSizingMode === "FIXED") {
    styles["width"] = "100%";
  } */
  
  if (!R.isNil(layoutAlign) && layoutAlign === "STRETCH") {
    styles["width"] = "100%";
  }

  // background or color
  if (type === "TEXT") {
    styles["color"] = getRgba(fills[0].color);
  } else {
    if (!!fills.length) {
      styles["backgroundImage"] = fills
        .map((fill: any) => {
          if (fill.type === "SOLID") {
            return (
              "linear-gradient(0deg, " +
              `${getRgba(fill.color)} 0%, ${getRgba(fill.color)} 100%` +
              ")"
            );
          }
          if (fill.type === "GRADIENT_LINEAR") {
            const angle = function (...args: { x: number; y: number }[]) {
              const [a, b] = args;
              return Math.round(
                (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI + 90
              );
            };
            const [a, b] = fill.gradientHandlePositions;
            return (
              `linear-gradient(${angle(a, b)}deg, ` +
              (fill.gradientStops || [])
                .map(
                  (gradient: any) =>
                    `${getRgba(gradient.color)} ${
                      (gradient.position || 0) * 100
                    }%`
                )
                .join(", ") +
              ")"
            );
          }

          if (fill.type === "IMAGE") {
            console.log(fill);
          }
          return "";
        })
        .join(",");
    }
  }

  // border
  if (!!strokes.length) {
    styles["boxShadow"] = `${strokeAlign === "INSIDE" && "inset "}${(
      strokes || []
    )
      .map(
        (stroke: any) =>
          `0 0 0 ${strokeWeight}px ${getRgba({
            ...stroke.color,
            a: stroke.opacity,
          })}`
      )
      .join(", ")}`;
  }

  // effects
  if (!!effects.length) {
    effects.forEach((effect: any) => {
      if (!styles["filter"]) styles["filter"] = "";
      if (effect.type === "DROP_SHADOW") {
        const { radius, color, offset } = effect;
        styles["filter"] += `drop-shadow(
          ${getRgba(color)} ${offset.x} ${offset.y} ${radius}
        );`;
      }

      if (effect.type === "LAYER_BLUR") {
        const { radius } = effect;
        styles["filter"] += `blur(${radius}px);`;
      }
    });
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
