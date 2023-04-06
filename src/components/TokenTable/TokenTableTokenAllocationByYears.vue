<template>
  <q-table
    class="my-sticky-column-table"
    :columns="tableData.columns as QTableProps['columns']"
    :rows="tableData.rows"
    :pagination="{ rowsPerPage: 0 }"
    hide-pagination
    flat
    bordered
    style="width: 100%"
  >
    <template #top>
      <div class="full-width row">
        <div class="text-h5 col">
          Unlock tokens by years
        </div>
        <q-space />
        <ui-number-field
          v-model="years"
          label="Years"
          outlined
          dense
          :debounce="300"
          :min-value="minYears"
          :max-value="maxYears"
        />
      </div>
    </template>
  </q-table>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { QTableProps } from 'quasar';
import { TokenAllocationListItem } from '@/types/token';
import { useFormatNumber } from '@/composition/useFormatters';
import UiNumberField from '@/components/ui/UiNumberField.vue';

const props = defineProps<{
    tokenAllocationData: TokenAllocationListItem[];
    maxTokenSupply: number;
    tgeTokensTotal: number;
}>();

const { numberFormat, percentFormat } = useFormatNumber();
const minYears = 1;
const maxYears = 10;
// eslint-disable-next-line no-underscore-dangle
const _years = ref(10);
const years = computed({
  get: () => _years.value,
  set: (value) => {
    if (value >= minYears && value <= maxYears) {
      _years.value = value;
    }
  },
});

const tableData = computed(() => {
  const yearsList = Array.from(new Array(years.value), (_, index) => index + 1);
  const monthsList = Array.from(new Array(years.value * 12), (_, index) => index + 1);
  const mainRows = props.tokenAllocationData.map((token) => {
    const result = {
      round: token.round,
      token_amount: token.token_amount,
      token_percent: token.token_percent,
      tge_amount: token.tge_amount,
      tge_percent: token.tge_amount ? Math.round((token.tge_amount / props.tgeTokensTotal) * 100) : 0,
    };

    return monthsList.reduce((acc, currentMonthNumber) => {
      const currentYearNumber = Math.floor((currentMonthNumber - 1) / 12) + 1;

      if (!acc[`year_${currentYearNumber}`]) {
        acc[`year_${currentYearNumber}`] = 0;
      }

      acc[`year_${currentYearNumber}`] += currentMonthNumber > token.cliff_months! && currentMonthNumber <= (token.cliff_months! + token.vesting_months!)
        ? token.post_tge_amount! / token.vesting_months! : 0;

      return acc;
    }, result as any);
  });

  const unlockScheduleRow = {
    round: 'Unlock schedule',
    total: true,
    ...mainRows.reduce((acc, item) => {
      Object.keys(item).forEach((key) => {
        if (typeof item[key] === 'number') {
          acc[key] = typeof acc[key] === 'number' ? acc[key] += item[key] : item[key];
        }
      });

      return acc;
    }, {} as any),
  };
  const circulatingRow = {
    round: 'Circulating',
    token_percent: 100,
    token_amount: unlockScheduleRow.token_amount,
    tge_amount: unlockScheduleRow.tge_amount,
    tge_percent: Math.round((unlockScheduleRow.tge_amount / props.maxTokenSupply) * 100),
    ...yearsList.reduce((acc, item) => {
      if (item === 1) {
        acc[`year_${item}`] = unlockScheduleRow.tge_amount + unlockScheduleRow[`year_${item}`];
      } else {
        acc[`year_${item}`] = acc[`year_${item - 1}`] + unlockScheduleRow[`year_${item}`];
      }

      return acc;
    }, {} as any),
  };
  const lockedRow = {
    round: 'Locked',
    token_percent: 0,
    token_amount: 0,
    tge_percent: 100 - circulatingRow.tge_percent,
    tge_amount: props.maxTokenSupply - circulatingRow.tge_amount,
    ...yearsList.reduce((acc, item) => {
      acc[`year_${item}`] = props.maxTokenSupply - circulatingRow[`year_${item}`];

      return acc;
    }, {} as any),
  };
  const closingTotalSupplyRow = {
    round: 'Closing Total Supply',
    total: true,
    token_percent: 100,
    token_amount: props.maxTokenSupply,
    tge_percent: circulatingRow.tge_percent + lockedRow.tge_percent,
    tge_amount: circulatingRow.tge_amount + lockedRow.tge_amount,
    ...yearsList.reduce((acc, item) => {
      acc[`year_${item}`] = circulatingRow[`year_${item}`] + lockedRow[`year_${item}`];

      return acc;
    }, {} as any),
  };

  return {
    rows: [
      unlockScheduleRow,
      ...mainRows,
      closingTotalSupplyRow,
      circulatingRow,
      lockedRow,
    ],
    columns: [
      {
        label: '',
        field: 'round',
        name: 'round',
        align: 'left',
        classes: getClasses,
      },
      {
        label: '% of total',
        field: 'token_percent',
        name: 'token_percent',
        align: 'right',
        format: (value:number) => percentFormat(value),
        classes: getClasses,
      },
      {
        label: 'Total',
        field: 'token_amount',
        name: 'token_percent',
        align: 'right',
        format: (value:number) => numberFormat(value),
        classes: getClasses,
      },
      {
        label: '% of TGE',
        field: 'tge_percent',
        name: 'tge_percent',
        align: 'right',
        format: (value:number) => percentFormat(value),
        classes: getClasses,
      },
      {
        label: 'TGE',
        field: 'tge_amount',
        name: 'tge_amount',
        align: 'right',
        format: (value:number) => numberFormat(value),
        classes: getClasses,
      },
      ...yearsList.map((year) => ({
        label: `Year ${year}`,
        field: `year_${year}`,
        name: `year_${year}`,
        format: (value:number) => numberFormat(value),
        classes: getClasses,
      })),
    ],
  };
});

function getClasses(row: any) {
  return row.total ? 'text-bold' : undefined;
}
</script>
<style lang="sass">
.my-sticky-column-table
  /* specifying max-width so the example can
    highlight the sticky column on any browser window */
  //max-width: 600px

  thead tr:first-child th:first-child
    /* bg color is important for th; just specify one */
    background-color: #fff
    border-right: 1px solid rgba(0, 0, 0, 0.12)

  td:first-child
    background-color: #fff
    border-right: 1px solid rgba(0, 0, 0, 0.12)

  th:first-child,
  td:first-child
    position: sticky
    left: 0
    z-index: 1
</style>
