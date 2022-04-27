import * as R from "ramda";
import * as parser from "../parser";
import storage from "../libs/storage";
import type { NodeType, ImageType } from "../types";

export default (item: NodeType) => {
  const { id, name, fills = [] } = item;

  //* 이미지가 포함되어 있다면, img 태그로 imageRef 값을 반환한다.
  const image = R.find(R.propEq("type", "IMAGE"))(fills as any) as ImageType;
  if (!!image) {
    const images = storage.getItem("images") || {};
    const attrs = R.mergeDeepLeft(
      { dataset: { src: images[image.imageRef] || "", ref: image.imageRef } },
      parser.getAttributes(name)
    );

    return { key: id, tagName: "img", ...attrs };
  }

  return {
    key: id,
    tagName: "div",
    style: { ...parser.getStyles(item) },
    ...parser.getAttributes(name),
  };
};
