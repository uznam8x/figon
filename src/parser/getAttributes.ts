const dataset = (data: any) => {
  const regex = /^\[(?<keys>.+)\]$/;
  const matched = data.match(regex);
  if (matched) {
    const { keys = "" } = matched.groups || {};
    return keys.split(",").reduce((a: any, b: any) => {
      const [key, value] = b.split("=");
      return { ...a, [key.trim()]: value.trim() };
    }, {});
  }
  return {};
};

export default (syntax: string) => {
  const regex =
    /^\$(?<tagName>[\*|\w|\-]+)?(?<id>#[\w|\-]+)?(?<className>\.[\w|\-|\.]+)*(?<data>\[.+\])*$/;

  const matched = syntax.match(regex);

  if (!!matched) {
    const { groups } = matched;
    const { tagName, id, className = "", data = "" } = groups as any;
    const classList = className.split(".").filter((v: any) => !!v);

    const res = {
      tagName,
      id,
      classList,
      className: classList.join(" "),
      dataset: dataset(data),
    };

    return res;
  }

  return {};
};
