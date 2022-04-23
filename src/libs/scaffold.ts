import * as R from "ramda";
import node from "./node";
export default (document: any) => {
  let artboards = {} as { [key: string]: any };

  const pages = R.pipe(
    R.reject((v: any) => !!/^\@/.test(v.name)),
    R.head,
    (v: any) =>
      (v.children || []).map((v: any) => {
        const { name, id, children = [], absoluteBoundingBox } = v;
        artboards[id] = R.pipe(
          R.map((v: any) => node(v, absoluteBoundingBox)),
          R.reject(R.isNil),
          R.sort((a: any, b: any) =>
            //* element order
            a.offset.x + a.offset.y < b.offset.x + b.offset.y ? -1 : 1
          )
        )(children);
        return { page: name, artboard: id };
      })
  )(document.children);

  return { pages, artboards };
};
