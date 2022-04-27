import storage from "./libs/storage";
import scaffold from "./libs/scaffold";
import axios from "axios";
const fetch = axios.create();
function run(res: any) {
  const [files, images] = res;
  const { document, components } = files.data as any;
  storage.setItem("components", components);
  storage.setItem("images", images.data.meta.images);
  return scaffold(document);
}

function start(token: string, file: string) {
  if (!!token && !!file) {
    const config = {
      baseURL: "https://api.figma.com",
      method: "get",
      headers: {
        "X-Figma-Token": token!,
      },
    };
    return Promise.all(
      [`/v1/files/${file}`, `/v1/files/${file}/images`].map((url) =>
        fetch({ ...config, url } as any)
      )
    ).then(run);
  } else {
    throw new Error("A 'FigmaToken' and 'FigmaFile' are required");
  }
}

export default start;
