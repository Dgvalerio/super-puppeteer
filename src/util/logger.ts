/* eslint-disable no-console */
export const logger = {
  info: (...props: unknown[]): void => console.log(...props),
  table: (props: Record<string, unknown> | Record<string, unknown>[]): void =>
    console.table(props),
};
