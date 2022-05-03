import storage from "../libs/storage";
import * as parser from "../parser";
import * as R from "ramda";
import type { NodeType, ElementType } from "../types";

export default (item: NodeType) => {
  const { id, name, children, componentId } = item;
  const components: any = storage.getItem("components");
  const component = components[componentId!] || {};

  const el: Partial<ElementType> = parser.getAttributes(name);
  el.dataset = (component.name.match(/([\w]+)=([\w]+)/g) || []).reduce(
    (a: { [key: string]: any }, b: string) => {
      const [key, value] = b.split("=");
      return { ...a, [key]: value };
    },
    el.dataset || {}
  );

  const attrs = R.filter((v: NodeType) => /^\{.+\}$/.test(v.name || ""))(
    children
  );

  if (!!(attrs || []).length) {
    el.dataset = attrs.reduce(
      (a, b) => ({ ...a, ...parser.getPropertyByCharacters(b) }),
      el.dataset
    );
  }

  return {
    key: id,
    tagName: "div",
    children,
    style: parser.getStyles(item),
    ...el,
  };
};
