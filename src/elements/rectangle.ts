import * as R from "ramda";
import * as parser from "../parser";
import styles from "../styles";
import storage from "../libs/storage";
import type { NodeType, ImageType } from "../types";

export default (item: NodeType) => {
  const { id, name, fills = [], absoluteBoundingBox } = item;

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

  const { width, height } = absoluteBoundingBox;
  return {
    key: id,
    tagName: "div",
    style: R.mergeLeft({ minWidth: width, minHeight: height }, styles(item)),
    ...parser.getAttributes(name),
  };
};
