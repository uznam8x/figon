import exec from "./padding";

test("padding", () => {
  const item: any = {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
    paddingBottom: 8,
  };
  expect(exec(item)).toEqual(
    Object.assign(item, {
      styles: item,
    })
  );
});
