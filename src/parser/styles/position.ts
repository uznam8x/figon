export default (item: any, bound: any) => {
  const { absoluteBoundingBox } = item;

  const sw = bound.width;
  const sh = bound.height;
  const { width, height } = absoluteBoundingBox;

  const x = absoluteBoundingBox.x - bound.x;
  const y = absoluteBoundingBox.y - bound.y;

  const left = (x / (sw - width)) * 100;
  const top = (y / (sh - height)) * 100;
  const styles = {
    left: `${left}%`,
    top: `${top}%`,
    transform: `translate(-${left}%, -${top}%)`,
  };

  return styles;
};
