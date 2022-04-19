import storage from "./libs/storage";
import scaffold from "./libs/scaffold";
import axios from "axios";

const fetch = axios.create();
function run(res: any) {
  // console.log(JSON.stringify(res.data, null, 2));
  const { document, components } = res.data as any;
  storage.setItem("components", components);
  return scaffold(document);
}

function start(token: string, file: string) {
  if (!!token && !!file) {
    //*
    return fetch({
      baseURL: "https://api.figma.com",
      url: `/v1/files/${file}`,
      method: "get",
      headers: {
        "X-Figma-Token": token!,
      },
    }).then(run);
    /*/
    return new Promise((resolve) => resolve(a))
      .then((res) => ({ data: res }))
      .then(run);
    //*/
  } else {
    throw new Error("A FigmaToken and FigmaFile are required");
  }
}

export default start;
