import * as R from "ramda";
import elements from "../elements";
import type { NodeType, OffsetType } from "../types";
/* function property(item: any) {
  const name = item.name;
  const content = item.characters;
  const regex = /\{(?<key>.+)\}/;
  const matched = name.match(regex);

  if (matched) {
    const { key } = matched.groups as any;
    return key ? { [key]: content } : {};
  }
  return {};
}

function getProperties(children: any) {
  return R.pipe(
    R.map(property),
    R.reduce((a: any, b: any) => ({ ...a, ...b }), {})
  )(children);
}

function rgba(color: any) {
  const { r, g, b, a = 0 } = color;

  //* if alpha value is 0 then null
  if (a === 0) return null;
  return `rgba(${255 * r}, ${255 * g}, ${255 * b}, ${a})`;
}
function getBorderRadius(size: number | number[]) {
  if (Array.isArray(size)) {
    const keys = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"];
    return size.reduce((a, b, i) => {
      const key = `border${keys[i]}Radius`;
      return { ...a, [key]: b };
    }, {});
  }

  return { borderRadius: Math.round(size) };
} */
/* 
function getStyle(item: any): StyleType {
  const {
    type,
    name,
    fills = [],
    style,
    backgroundColor,
    cornerRadius,
    rectangleCornerRadii,
  } = item;

  //* none style;
  if (type.toUpperCase() === "GROUP") return {};

  let styles: any = {};

  //* font
  if (!R.isNil(style)) {
    styles["fontWeight"] = style["fontWeight"];
    styles["fontSize"] = style["fontSize"];
    styles["lineHeight"] = Math.round(style["lineHeightPx"]) + "px";
    styles["textAlign"] = style["textAlignHorizontal"].toLowerCase();
  }

  //* color
  if (fills.length > 0) {
    const fill: any = R.head(fills);

    //* background
    if (["VECTOR", "RECTANGLE"].indexOf(type.toUpperCase()) > -1) {
      const color = rgba(fill.color);
      if (color) styles["backgroundColor"] = color;
    }

    if (["TEXT"].indexOf(type.toUpperCase()) > -1) {
      const color = rgba(fill.color);
      if (color) styles["color"] = rgba(fill.color);
    }
  }

  //* flex base
  if (type === "FRAME") {
    const { layoutMode = "", itemSpacing } = item;
    styles["flexDirection"] =
      layoutMode.toUpperCase() === "VERTICAL" ? "column" : "row";
    styles["gap"] = itemSpacing || 0;
    styles["display"] = "flex";
  }

  //* border-radius
  if (!R.isNil(cornerRadius)) {
    const res = getBorderRadius(rectangleCornerRadii || cornerRadius);
    styles = R.mergeDeepLeft(res, styles);
  }

  return styles;
} */
/* 
function pluck(item: any) {
  const { type, name, children } = item;
  if (type === "GROUP") {
    const index = R.findIndex((v: any) => v.type === "RECTANGLE")(children);
    const rect = R.nth(index)(children) as any;
    rect.name = name;
    rect.children = R.remove(index, 1)(children);

    // console.log(JSON.stringify(rect, null,2));
    return rect;
  }
  return item;
} */

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
  /* const components = storage.getItem("components");

  const record = pluck(item);
  const {
    name,
    visible = true,
    id,
    children = [],
    type,
    characters,
    componentId,
    absoluteBoundingBox,
  } = record;

  //* Postion
  const offset: OffsetType = {
    ...absoluteBoundingBox,
    x: absoluteBoundingBox.x - bounding.x,
    y: absoluteBoundingBox.y - bounding.y,
  };

  //* check visible
  if (!visible) return null;

  const element: any = /^\$/.test(name)
    ? parse.selector(name)
    : {
        tagName: type.toUpperCase() === "TEXT" ? "p" : "div",
        name,
        key: id,
        type,
      };

  //* Property from children
  let [childNode, attrs] = R.splitWhen((v: any) => {
    return /\{(.+)\}/.test(v.name);
  }, children);

  //* exist component
  let pairs = !!componentId ? parse.pair(components[componentId].name) : {};

  //* merge all
  element.attributes = {
    ...element.attributes,
    ...getProperties(attrs),
    ...pairs,
  };

  return {
    key: id,
    offset,
    type,
    style: getStyle(record),
    ...element,
    children: R.pipe(
      R.map((v) =>
        //* Absolute postion to Relative position
        node(v, {
          ...bounding,
          x: bounding.x + offset.x,
          y: bounding.y + offset.y,
        })
      ),
      R.reject(R.isNil),
      R.sort((a: any, b: any) =>
        //* element order
        a.offset.x + a.offset.y < b.offset.x + b.offset.y ? -1 : 1
      )
    )(childNode),
    ...(characters ? { textContent: characters } : {}),
  } as ElementType; */
}

export default node;
