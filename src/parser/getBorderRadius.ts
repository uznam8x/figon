export default (size: number | number[]) => {
  if (Array.isArray(size)) {
    const keys = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"];
    return size.reduce((a, b, i) => {
      const key = `border${keys[i]}Radius`;
      return { ...a, [key]: b };
    }, {}) as any;
  }

  return { borderRadius: Math.round(size) };
};
