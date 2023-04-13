export function useMath() {
  function calcSum(value: number[]) {
    return value.reduce((acc, val) => {
      // eslint-disable-next-line no-param-reassign
      return acc + val;
    }, 0);
  }

  return {
    calcSum,
  };
}
