import * as R from "ramda";
function pair(syntax: string) {
  const [key, value] = syntax.split("=");
  if ([key, value].some((v) => R.isNil(v))) {
    return {};
  }
  return { [key]: value };
}

function attributes(syntax: string) {
  return !!syntax
    ? (syntax.match(/([\w]+)=([\w]+)/g) || []).reduce(
        (a, b) => ({ ...a, ...pair(b) }),
        {}
      )
    : {};
}

function selector(syntax: string) {
  const regex =
    /^(?<tagName>[\*|\w|\-]+)?(?<id>#[\w|\-]+)?(?<className>\.[\w|\-|\.]+)*(?<data>\[.+\])*$/;
  const matched = syntax.match(regex);

  if (!!matched) {
    const { groups } = matched;
    const { tagName, id, className = "", data = "" } = groups as any;
    return {
      tagName,
      id,
      classList: className.split(".").filter((v: any) => !!v),
      attributes: attributes(data),
    };
  }

  return {};
}

export default { selector, attributes, pair };
