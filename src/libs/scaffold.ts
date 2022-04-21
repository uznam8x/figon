import * as R from "ramda";
import node from "./node";
export default (document: any) => {
  let views = {} as { [key: string]: any };

  const routes = R.pipe(
    R.reject((v: any) => !!/^\@/.test(v.name)),
    R.head,
    (v: any) =>
      (v.children || []).map((v: any) => {
        const { name, id, children = [], absoluteBoundingBox } = v;
        views[id] = R.pipe(
          R.map((v: any) => node(v, absoluteBoundingBox)),
          R.reject(R.isNil),
          R.sort((a: any, b: any) =>
            //* element order
            a.offset.x + a.offset.y < b.offset.x + b.offset.y ? -1 : 1
          )
        )(children);
        return { path: name, view: id };
      })
  )(document.children);

  return { routes, views };
};
