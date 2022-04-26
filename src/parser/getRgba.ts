export default (item: any): string => {
  if (!item) return "";
  const { r, g, b, a = 0 } = item;
  const color = [r, g, b].map((v) => Math.round(255 * v)).join(", ");
  return `rgba(${color}, ${a})`;
};
