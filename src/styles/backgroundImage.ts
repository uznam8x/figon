import type { NodeType, ColorType } from "../types";
import rgba from "../utils/rgba";

function draw(angle: number, color: string) {
  return `linear-gradient(${angle}deg, ${color} )`;
}

function solid(color: ColorType) {
  const value = rgba(color);
  return draw(0, `${value} 0%, ${value} 100%`);
}

function gradient(position: any[], steps: any[]) {
  const angle = function (...args: { x: number; y: number }[]) {
    const [a, b] = args;
    return Math.round((Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI + 90);
  };
  const [a, b] = position;

  const color = (steps || [])
    .map(
      (gradient: any) =>
        `${rgba(gradient.color)} ${(gradient.position || 0) * 100}%`
    )
    .join(", ");
  return draw(angle(a, b), color);
}

export default (item: NodeType) => {
  const { styles = {}, fills = [] } = item;

  styles["backgroundImage"] = fills
    .map((fill: any) => {
      if (fill.type === "SOLID") {
        return solid(fill.color);
      }
      if (fill.type === "GRADIENT_LINEAR") {
        return gradient(fill.gradientHandlePositions, fill.gradientStops);
      }

      return "";
    })
    .join(",");
  return styles;
};
