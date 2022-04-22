import storage from "../libs/storage";
import * as parser from "../parser";
import type { NodeType } from "../types";
export default (item: NodeType) => {
  const { id, name, type, children, componentId } = item;
  const components: any = storage.getItem("components");
  const component = components[componentId!] || {};

  const dataset = (component.name.match(/([\w]+)=([\w]+)/g) || []).reduce(
    (a: any, b: string) => {
      const [key, value] = b.split("=");
      return { ...a, [key]: value };
    },
    (parser.getAttributes(name) as any).dataset || {}
  );

  return {
    key: id,
    type,
    tagName: "div",
    children,
    dataset,
    style: parser.getStyles(item),
    ...parser.getAttributes(name),
  };
};
