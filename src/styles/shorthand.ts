/* --------------------------------- padding -------------------------------- */
const pl = (args: string | number) => {
  return { paddingLeft: args };
};

const pr = (args: string | number) => {
  return { paddingRight: args };
};

const pt = (args: string | number) => {
  return { paddingTop: args };
};

const pb = (args: string | number) => {
  return { paddingBottom: args };
};

const py = (args: string | number) => {
  return { ...pt(args), ...pb(args) };
};

const px = (args: string | number) => {
  return { ...pl(args), ...pr(args) };
};

const pa = (args: string | number) => {
  return { ...px(args), ...py(args) };
};
/* -------------------------------------------------------------------------- */

/* --------------------------------- margin -------------------------------- */
const ml = (args: string | number) => {
  return { marginLeft: args };
};

const mr = (args: string | number) => {
  return { marginRight: args };
};

const mt = (args: string | number) => {
  return { marginTop: args };
};

const mb = (args: string | number) => {
  return { marginBottom: args };
};

const my = (args: string | number) => {
  return { ...mt(args), ...mb(args) };
};

const mx = (args: string | number) => {
  return { ...ml(args), ...mr(args) };
};

const ma = (args: string | number) => {
  return { ...mx(args), ...my(args) };
};
/* -------------------------------------------------------------------------- */

export default { pa, pl, pr, pt, pb, py, px, ma, ml, mr, mt, mb, my, mx };
