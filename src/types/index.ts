export type ElementType = {
  key: string;
  tagName?: string;
  classList: string[];
  className: string;
  dataset: { [key: string]: any };
  attributes: { [key: string]: any };
  textContent?: string;
  children: ElementType[];
};

export type OffsetType = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type StyleType = Partial<{
  backgroundColor: string;
  color: string;
  fontWeight: number;
  fontSize: number;
  lineHeight: string;
  flexDirection: string;
  flexGrow: number;
  display: string;
  alignItems: string;
  justifyContent: string;
  gap: number;
  textAlign: string;
  borderRadius: number;
  borderTopLeftRadius: number;
  borderTopRightRadius: number;
  borderBottomLeftRadius: number;
  borderBottomRightRadius: number;
}>;

export type NodeType = {
  id: string;
  visible?: Boolean;
  componentId?: string;
  type: string;
  name: string;
  children: NodeType[];
  characters?: string;
  style?: any;
  styles?: { [key: string]: any };
  effects?: any[];
  fills?: any[];
  absoluteBoundingBox: { x: number; y: number; width: number; height: number };
  layoutMode: "VERTICAL" | "HORIZONTAL";
  itemSpacing: number;
  backgroundColor?: any;
  layoutGrow: number;
  counterAxisAlignItems?: string;
  primaryAxisAlignItems?: string;
  cornerRadius: number;
  rectangleCornerRadii: number[];
  counterAxisSizingMode?: string;
  primaryAxisSizingMode?: string;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
};

export type ImageType = {
  type: string;
  imageRef: string;
};
