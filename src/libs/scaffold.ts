import * as R from "ramda";
import node from "./node";
export default (document: any) => {
  let artboards = {} as { [key: string]: any };

  const pages = R.pipe(
    R.reject((v: any) => !!/^\@/.test(v.name)),
    R.head,
    (v: any) => {
      return (v.children || []).map((v: any) => {
        const { name, id, absoluteBoundingBox } = v;
        // console.log(JSON.stringify(v, null, 2));
        const view = node(v, absoluteBoundingBox);
        artboards[id] = view;
        return { page: name, artboard: id };
      });
    }
  )(document.children);

  return { pages, artboards };
};
