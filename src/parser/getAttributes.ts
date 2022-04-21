export default (syntax: string) => {
  const regex =
    /^\$(?<tagName>[\*|\w|\-]+)?(?<id>#[\w|\-]+)?(?<className>\.[\w|\-|\.]+)*(?<data>\[.+\])*$/;

  const matched = syntax.match(regex);

  if (!!matched) {
    const { groups } = matched;
    const { tagName, id, className = "", data = "" } = groups as any;
    const classList = className.split(".").filter((v: any) => !!v);

    const regex = /([\w]+)=([\w]+)/g;
    const dataset = (data.match(regex) || []).reduce((a: any, b: any) => {
      const [key, value] = b.split("=");
      return { ...a, [key]: value };
    }, {});

    const res = {
      tagName,
      id,
      classList,
      className: classList.join(" "),
      dataset,
    };

    return res;
  }

  return {};
};
