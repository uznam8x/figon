import type { NodeType } from "../types";
export default (item: NodeType) => {
  const { name, characters = "" } = item;

  const regex = /\{(?<key>.+)\}/;
  const matched = name.match(regex);

  if (matched) {
    const { key } = matched.groups as any;
    return key ? { [key]: characters } : {};
  }
  return {};
};
