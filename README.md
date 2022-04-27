![figon](https://user-images.githubusercontent.com/14268172/165513960-eecdf381-7f3c-48d5-b240-29fa18dc8f5a.jpg)

# figon

Convert Figma to html format json

# Install

```bash
yarn add figon
```

# Basic usage

```typescript
import figon from "figon";

figon(TOKEN, FILE).then((response) => console.log(response));
```

# Figma name syntax example

```
$a.class1.class2[data1=a,data2=b]
```

```json
{
  "tagName": "a",
  "classList": ["class1", "class2"],
  "dataset": {
    "data1": "a",
    "data2": "b"
  },
  ...more
}
```
