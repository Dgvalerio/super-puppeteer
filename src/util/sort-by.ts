export const sortBy =
  <T = Record<string, unknown>>(param: keyof T) =>
  (a: T, b: T): number => {
    if (a[param] < b[param]) return -1;
    else if (a[param] > b[param]) return 1;
    else return 0;
  };
