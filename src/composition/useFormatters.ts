import dayjs from 'dayjs';

export function useDateFormatters() {
  function formatFromTimestamp(value?: number, format = 'DD.MM.YYYY') {
    return dayjs(value).format(format);
  }

  return {
    formatFromTimestamp,
  };
}
