import type { NodeType } from "../types";
import * as parser from "../parser";
import storage from "../libs/storage";
import rectangle from "./rectangle";
import frame from "./frame";
export default (item: NodeType) => {
  const { name, children, componentId } = item;
  const components: any = storage.getItem("components");
  const component = components[componentId!] || {};

  const dataset = (component.name.match(/([\w]+)=([\w]+)/g) || []).reduce(
    (a: any, b: string) => {
      const [key, value] = b.split("=");
      return { ...a, [key]: value };
    },
    {}
  );

  const a = rectangle(item);
  const b = frame(item);
  return {
    ...rectangle(item),
    children,
    dataset,
    style: { ...a.style, ...b.style },
    ...parser.getAttributes(name),
  };
};
