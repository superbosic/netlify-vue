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
          Unlock tokens by month
        </div>
        <q-space />
        <ui-number-field
          :model-value="months"
          label="Months"
          outlined
          dense
          :debounce="300"
          :min-value="minMonths"
          :max-value="maxMonths"
          @update:model-value="emits('update:months', $event as number)"
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
  minMonths: number;
  maxMonths: number;
  months: number,
}>();

const emits = defineEmits<{
    (e: 'update:months', value: number): void
}>();

const { numberFormat, percentFormat } = useFormatNumber();

const tableData = computed(() => {
  const monthsList = Array.from(new Array(props.months), (_, index) => index + 1);
  const mainRows = props.tokenAllocationData.map((token) => {
    const result = {
      round: token.round,
      token_amount: token.token_amount,
      token_percent: token.token_percent,
      tge_amount: token.tge_amount,
      tge_percent: token.tge_amount ? Math.round((token.tge_amount / props.tgeTokensTotal) * 100) : 0,
    } as any;

    token.unlock_scheme?.forEach((scheme) => {
      if (scheme.type === 'liner') {
        let sum = 0;

        for (let i = 1; i <= scheme.vesting_months!; i++) {
          sum += typeof result[`month_${i}`] === 'number' ? result[`month_${i}`] : 0;
        }

        for (let i = scheme.month_after_tge!; i <= scheme.vesting_months!; i++) {
          result[`month_${i}`] = (token.post_tge_amount! - sum) / scheme.month_after_tge!;
        }
      } else {
        result[`month_${scheme.month_after_tge}`] = (token.post_tge_amount! / 100) * scheme.percent!;
      }
    });
    return result;
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
    ...monthsList.reduce((acc, item) => {
      if (item === 1) {
        acc[`month_${item}`] = unlockScheduleRow.tge_amount + unlockScheduleRow[`month_${item}`];
      } else {
        acc[`month_${item}`] = acc[`month_${item - 1}`] + unlockScheduleRow[`month_${item}`];
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
    ...monthsList.reduce((acc, item) => {
      acc[`month_${item}`] = props.maxTokenSupply - circulatingRow[`month_${item}`];

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
    ...monthsList.reduce((acc, item) => {
      acc[`month_${item}`] = circulatingRow[`month_${item}`] + lockedRow[`month_${item}`];

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
        format: (value:number) => numberFormat(value, 0),
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
        format: (value:number) => numberFormat(value, 0),
        classes: getClasses,
      },
      ...monthsList.map((month) => ({
        label: `Month ${month}`,
        field: `month_${month}`,
        name: `month_${month}`,
        format: (value:number) => numberFormat(value, 0),
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
