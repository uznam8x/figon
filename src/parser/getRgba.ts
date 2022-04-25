export default (item: any): string => {
  if (!item) return "";
  const { r, g, b, a = 0 } = item;
  return `rgba(${255 * r}, ${255 * g}, ${255 * b}, ${a})`;
};
