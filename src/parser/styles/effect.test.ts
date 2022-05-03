import exec from "./effect";

test("rectangleCornerRadii", () => {
  const item: any = {
    rectangleCornerRadii: [8, 8, 8, 8],
  };
  expect(exec(item)).toEqual(
    Object.assign(item, {
      styles: {},
    })
  );
});
