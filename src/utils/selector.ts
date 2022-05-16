export type SelectorType = Partial<{
  tagName: string;
  id: string;
  className: string;
  data: string;
  style: string;
}>;

export default (syntax: string): SelectorType => {
  const regex =
    /^\$(?<tagName>[\*|\w|\-]+)?(?<id>#[\w|\-]+)?(?<className>\.[\w|\-|\.]+)*(?<data>\[.+\])*(?<style>\{.+\})*$/;

  const matched = syntax.match(regex);
  return matched ? matched.groups : {};
};
