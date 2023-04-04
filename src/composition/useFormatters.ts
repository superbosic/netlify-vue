import dayjs from 'dayjs';
import { isDefined } from '@/utils/extra';

const usNumberFormat = new Intl.NumberFormat('us-US');

export const FRACTION_DIGITS = 1;

export function useDateFormatters() {
  function formatFromTimestamp(value?: number, format = 'DD.MM.YYYY HH:mm') {
    return dayjs(value).format(format);
  }

  return {
    formatFromTimestamp,
  };
}

export function useFormatNumber() {
  function numberFormat(value: NotDefined<number>, fractionDigits = FRACTION_DIGITS) {
    return (isDefined(value) && !Number.isNaN(value) ? usNumberFormat.format(Number(value.toFixed(fractionDigits))) : '');
  }

  function currencyFormat(value: NotDefined<number>, currency = '$', fractionDigits = FRACTION_DIGITS) {
    return isDefined(value) ? `${numberFormat(value, fractionDigits)} ${currency}` : '';
  }

  function percentFormat(value: NotDefined<number>) {
    const val = numberFormat(value);

    return val ? `${val}%` : '';
  }

  return {
    numberFormat,
    currencyFormat,
    percentFormat,
  };
}
