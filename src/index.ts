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

/*
{
  error: false,
  status: 200,
  meta: {
    images: {
      '153adc0939efd31b9611f36291d973d2c32add79': 'https://s3-alpha-sig.figma.com/img/153a/dc09/39efd31b9611f36291d973d2c32add79?Expires=1652054400&Signature=TYbc5up7Lep2J-kOpcW9MI6rNzE36wscIUgHTUzyP--hG0ofECk68XeGN~lu-TG0Mc63JC~rWvW0R048fE16LIkRbFj0o9QGuD3t73GQo5o7ly5tq12ZxunQHUhy7naRuiIb-MxMnSA4lufvC2Ver-hU-oNt59QZPAXi5KguIcsDA374PU2ZwLtnqrEbtjZNNA86UQUVj~8NAaOzu7ti~IShtv6pUHwcchD8pimjm8d8VEGU7Xsnm9Pk5--M2Ib4XEl9xuXrrqeUYAqQFzxLVTbNe4gJ6WBbmxgnLXvNT7L8aE3VGtApv60XT01rxQftd89zIS98O98OKIiJ7ngFMA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
      d6aea74605c63a126946e844a92813b45938966f: 'https://s3-alpha-sig.figma.com/img/d6ae/a746/05c63a126946e844a92813b45938966f?Expires=1652054400&Signature=HipL5ElGrLAvGTJisXrUjknvluAqYxjvU3-wOI~GeyeyEijNJZvyxpQMZXgusVPjf6ygBmJ1mgFbTzXk61o~Scxdyizmr0cyukBrQ1FfV5oflVKzitYE-OXRq3IvPGXzF5Ibe5GB2ILiSm2~QYXpF2h6PwhwRxqBOxZYbcaueBJrlU1~40OILdefhVvtXvxBpkdB9TpONt66nXhdxBC~Onmc9ZRUGkeZxRgHwB6AwEMcxql1xDIPduz7NHizPOizkWHS5tSke4dNUuMet06cTyFSjXI-Jaa8DsDHEuFwdEu2pu05E~W382TSdjjtgnHO30lNG9Tw5xevbXMaKDRa9w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'
    }
  },
  i18n: null
}
*/

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

    return fetch({
      baseURL: "https://api.figma.com",
      url: `/v1/files/${file}`,
      method: "get",
      headers: {
        "X-Figma-Token": token!,
      },
    }).then(run);
  } else {
    throw new Error("A 'FigmaToken' and 'FigmaFile' are required");
  }
}

export default start;
