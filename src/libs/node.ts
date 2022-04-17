import parse from "./parse";
import storage from "./storage";
import * as R from "ramda";

export type NodeType = {
  key: string;
  type: string;
  tagName: string;
  classList: string[];
  attributes: { [key: string]: any };
  textContent?: string;
  children: NodeType[];
};

export type OffsetType = {
  x: number;
  y: number;
  width: number;
  height: number;
};

function property(item: any) {
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

function node(item: any, bounding: OffsetType): NodeType | null {
  const components = storage.getItem("components");
  const {
    name,
    visible = true,
    id,
    children = [],
    type,
    characters,
    componentId,
    absoluteBoundingBox,
  } = item;

  //* Postion
  const offset: OffsetType = {
    ...absoluteBoundingBox,
    x: absoluteBoundingBox.x - bounding.x,
    y: absoluteBoundingBox.y - bounding.y,
  };

  //* check visible
  if (!visible) return null;

  const element: any = /^$/.test(name)
    ? parse.selector(name)
    : { tagName: "div", name, key: id, type };

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
  } as NodeType;
}

export default node;
