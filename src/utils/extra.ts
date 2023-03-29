export function isDefined<T>(value: T): value is NonNullable<T> {
  return value !== undefined && value !== null;
}

// https://github.com/lodash/lodash/blob/master/isNil.js
export function isNil<T>(value: T): value is T extends null | undefined ? T : never {
  return value == null;
}

export const objectIsEmpty = (obj: Record<string, unknown>) => obj.constructor === Object && Object.keys(obj).length === 0;
