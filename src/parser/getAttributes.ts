import * as R from "ramda";
const dataset = (data: any) => {
  const regex = /^\[(?<keys>.+)\]$/;
  const matched = data.match(regex);
  if (matched) {
    const { keys = "" } = matched.groups || {};
    return keys.split(",").reduce((a: any, b: any) => {
      const [key, value] = b.split("=");
      return { ...a, [key.trim()]: value.trim().replace(/['"]/g, "") };
    }, {});
  }
  return {};
};

export default (syntax: string) => {
  const selector =
    /^\$(?<tagName>[\*|\w|\-]+)?(?<id>#[\w|\-]+)?(?<className>\.[\w|\-|\.]+)*(?<data>\[.+\])*$/;

  const matched = syntax.match(selector);

  if (!!matched) {
    const { groups } = matched;
    const { tagName, id, className = "", data = "" } = groups as any;
    const classList = className.split(".").filter((v: any) => !!v);

    const res: any = {
      tagName,
      classList,
      className: classList.join(" "),
      dataset: dataset(data),
    };

    if (!R.isNil(id)) {
      res["id"] = id.replace("#", "");
    }
    return res;
  }

  const variable = /^\[:(\w+)\]$/;
  if (variable.test(syntax)) {
    const matched: any = syntax.match(variable);
    return {
      bind: matched[1],
    };
  }

  return {};
};
