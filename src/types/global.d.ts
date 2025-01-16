export {};

declare global {
  type GetValues<T extends Record<any, any>> = T[keyof T];
}
