export type ElementType = {
  key: string;
  type: string;
  tagName: string;
  classList: string[];
  className: string;
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
  componentId?: string;
  type: string;
  name: string;
  children: NodeType[];
  characters?: string;
  style?: any;
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
};
