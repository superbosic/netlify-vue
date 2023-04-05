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
          v-model="months"
          label="Months"
          outlined
          dense
          :debounce="300"
          :min-value="minMonths"
          :max-value="maxMonths"
        />
      </div>
    </template>
  </q-table>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { TokenAllocationListItem } from '@/types/token';
import { useFormatNumber } from '@/composition/useFormatters';
import UiNumberField from '@/components/ui/UiNumberField.vue';
import {QTableProps} from "quasar";

const props = defineProps<{
tokenAllocationData: TokenAllocationListItem[]
}>();

const { numberFormat, percentFormat } = useFormatNumber();
const minMonths = 1;
const maxMonths = 120;
// eslint-disable-next-line no-underscore-dangle
const _months = ref(12);
const months = computed({
  get: () => _months.value,
  set: (value) => {
    if (value >= minMonths && value <= maxMonths) {
      _months.value = value;
    }
  },
});

const tableData = computed(() => {
  const monthsList = Array.from(new Array(months.value), (_, index) => index + 1);

  return {
    rows: props.tokenAllocationData.map((token) => {
      const result = {
        round: token.round,
        token_amount: token.token_amount,
        token_percent: token.token_percent,
        tge_amount: token.tge_amount,
        tge_percent: token.tge_percent,
      };

      return monthsList.reduce((acc, currentMonthNumber) => {
        acc[`month_${currentMonthNumber}`] = currentMonthNumber > token.cliff_months! && currentMonthNumber <= (token.cliff_months! + token.vesting_months!)
          ? token.post_tge_amount! / token.vesting_months! : 0;

        return acc;
      }, result as any);
    }),
    columns: [
      {
        label: '',
        field: 'round',
        name: 'round',
        align: 'left',
      },
      {
        label: '% of total',
        field: 'token_percent',
        name: 'token_percent',
        align: 'right',
        format: (value:number) => percentFormat(value),
      },
      {
        label: 'Total',
        field: 'token_amount',
        name: 'token_percent',
        align: 'right',
        format: (value:number) => numberFormat(value),
      },
      {
        label: '% of TGE',
        field: 'tge_percent',
        name: 'tge_percent',
        align: 'right',
        format: (value:number) => percentFormat(value),
      },
      {
        label: 'TGE',
        field: 'tge_amount',
        name: 'tge_amount',
        align: 'right',
        format: (value:number) => numberFormat(value),
      },
      ...monthsList.map((month) => ({
        label: `Month ${month}`,
        field: `month_${month}`,
        name: `month_${month}`,
        format: (value:number) => numberFormat(value),
      })),
    ],
  };
});
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
