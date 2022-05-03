import exec from "./font";

test("textAlignHorizontal", () => {
  const item: any = {
    style: {
      textAlignHorizontal: "left",
    },
  };
  expect(exec(item)).toEqual(
    Object.assign(item, {
      style: { textAlign: "left" },
    })
  );
});
test("lineHeightPx", () => {
  const item: any = {
    style: {
      lineHeightPx: "18",
    },
  };
  expect(exec(item)).toEqual(
    Object.assign(item, {
      style: { lineHeight: "18px" },
    })
  );
});
