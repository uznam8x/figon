import type { NodeType } from "../../types";
import getRgba from "../getRgba";
export default (item: NodeType) => {
  const { style = {}, effects = [] } = item;

  const styles: { [key: string]: any } = {};
  if (!!effects.length) {
    effects.forEach((effect: any) => {
      if (!style["filter"]) style["filter"] = "";
      if (effect.type === "DROP_SHADOW") {
        const { radius, color, offset } = effect;
        styles["filter"] += `drop-shadow(
          ${getRgba(color)} ${offset.x} ${offset.y} ${radius}
        );`;
      }

      if (effect.type === "LAYER_BLUR") {
        const { radius } = effect;
        styles["filter"] += `blur(${radius}px);`;
      }
    });
  }

  return styles;
};
