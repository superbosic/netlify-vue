import { TokenAllocationListItemUnlockScheme } from '@/types/token';
import { useFormatNumber } from '@/composition/useFormatters';

export function useToken() {
  const { numberFormat, percentFormat } = useFormatNumber();

  function unlockSchemeToString(item: TokenAllocationListItemUnlockScheme) {
    if (item.type === 'onetime') {
      return `${percentFormat(item.percent)} ${numberFormat(item.month_after_tge)} month after TGE`;
    }

    return `liner ${numberFormat(item.month_after_tge)} month after TGE for ${numberFormat(item.vesting_months)} months`;
  }

  return {
    unlockSchemeToString,
  };
}
