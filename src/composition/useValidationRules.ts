export const MAX_INT32 = 2147483647;

export function useValidationRules() {
  const FIELD_REQUIRED = 'Required';

  function defaultRequiredRule<T>(value: T | null | undefined): boolean | string {
    return !!value || FIELD_REQUIRED;
  }

  function numberRequiredRule(value: unknown): boolean | string {
    return typeof value === 'number' || FIELD_REQUIRED;
  }

  function multipleRequiredRule(value: NotDefined<unknown[]>): boolean | string {
    return (value && (Array.isArray(value) && value.length > 0)) || FIELD_REQUIRED;
  }

  function minValue(min: number, minText: string | number = min): Rule<number> {
    return (value) => value >= min || `Введенное значение должно быть не меньше ${minText}`;
  }

  function maxValue(max: number, maxText: string | number = max): Rule<number> {
    return (value) => value <= max || `Введенное значение должно быть не больше ${maxText}`;
  }

  function numberCustomMinValue(min: number): Rule<'' | number | null | undefined> {
    const rule = minValue(min);

    return (value) => typeof value !== 'number' || rule(value);
  }

  function numberCustomMaxValue(max: number): Rule<'' | number | null | undefined> {
    const rule = maxValue(max);

    return (value) => typeof value !== 'number' || rule(value);
  }

  function maxTextLength(max: number): Rule<string> {
    return (value: string) => value.length <= max;
  }

  const defaultRequiredRules = [defaultRequiredRule];
  const defaultMultipleRequiredRule = [multipleRequiredRule];

  return {
    defaultRequiredRule,
    defaultRequiredRules,
    numberRequiredRule,
    multipleRequiredRule,
    defaultMultipleRequiredRule,
    numberCustomMinValue,
    numberCustomMaxValue,
    maxTextLength,
  };
}
