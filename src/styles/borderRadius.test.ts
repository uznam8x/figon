import exec from "./borderRadius";

test("cornerRadius", () => {
  const item: any = {
    cornerRadius: 8,
  };
  expect(exec(item)).toEqual(
    Object.assign(item, {
      style: { borderRadius: 8 },
    })
  );
});

test("rectangleCornerRadii", () => {
  const item: any = {
    rectangleCornerRadii: [8, 8, 8, 8],
  };
  expect(exec(item)).toEqual(
    Object.assign(item, {
      style: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
      },
    })
  );
});
