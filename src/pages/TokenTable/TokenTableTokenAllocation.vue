<template>
  <div class="column q-gutter-md">
    <div>
      <q-table
        key="id"
        :title="title"
        :loading="loading"
        :rows="rows"
        :columns="columns"
        hide-pagination
        flat
        bordered
      >
        <template #top>
          <div class="full-width row">
            <div class="text-h5 col">
              {{ title }}
            </div>
            <q-space />
            <q-btn
              color="primary"
              label="Add token allocation"
              no-caps
              @click="tokenTableTokenAllocationAddNewDialogIsOpen = true"
            />
          </div>
        </template>

        <template #body-cell-actions="{ row }">
          <q-td>
            <q-btn
              icon="edit"
              color="primary"
              flat
              padding="4px"
              @click="editItem(row)"
            />
            <q-btn
              icon="delete"
              color="negative"
              flat
              padding="4px"
              @click="deleteItem(row)"
            />
          </q-td>
        </template>

        <template #bottom-row>
          <q-tr>
            <q-td>
              <div class="text-bold">
                Total
              </div>
            </q-td>
            <q-td class="text-bold text-right">
              {{ percentFormat(totalRow.token_percent) }}
            </q-td>
            <q-td class="text-bold text-right">
              {{ numberFormat(totalRow.token_amount) }}
            </q-td>
            <q-td class="text-bold text-right">
              {{ currencyFormat(totalRow.price_usd) }}
            </q-td>
            <q-td class="text-bold text-right">
              {{ currencyFormat(totalRow.raise_usd) }}
            </q-td>
            <q-td />
            <q-td class="text-bold text-right">
              {{ percentFormat(totalRow.tge_percent) }}
            </q-td>
            <q-td class="text-bold text-right">
              {{ numberFormat(totalRow.tge_amount) }}
            </q-td>
            <q-td class="text-bold text-right">
              {{ percentFormat(totalRow.post_tge_percent) }}
            </q-td>
            <q-td class="text-bold text-right">
              {{ numberFormat(totalRow.post_tge_amount) }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <token-table-token-allocation-add-new-dialog
        v-if="tokenTableTokenAllocationAddNewDialogIsOpen"
        v-model="tokenTableTokenAllocationAddNewDialogIsOpen"
        :token="rowToEdit"
        @created="onTokenAllocationCreated"
      />
    </div>
    <div>
      <q-card
        flat
        bordered
      >
        <q-card-section>
          <pie
            :data="chartData"
            :options="chartOptions"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { QTableProps, useQuasar } from 'quasar';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend, Title,
  ChartOptions, ChartData,
} from 'chart.js';
import { Pie } from 'vue-chartjs';
import { createApiInstance } from '@/api';
import { Tokentable } from '@/api/Tokentable';
import useRequest from '@/composition/useRequest';
import { useFormatNumber } from '@/composition/useFormatters';
import TokenTableTokenAllocationAddNewDialog from '@/components/TokenTable/TokenTableTokenAllocationAddNewDialog.vue';
import { COLORS } from '@/utils/chart';
import { ExtractHttpResponseType } from '@/types/http';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

type IRow = NonNullable<NonNullable<NonNullable<ExtractHttpResponseType<ReturnType<Tokentable['tokenAllocationList']>>['data']>['tokentable']>['token_allocation']>[0];
type ITotalRow = Pick<IRow, 'token_amount' | 'token_percent' | 'tge_amount' | 'tge_percent' | 'price_usd' | 'raise_usd' | 'post_tge_amount' | 'post_tge_percent'>;
const { dialog } = useQuasar();
const tokenTableApi = createApiInstance(Tokentable);
const { numberFormat, currencyFormat, percentFormat } = useFormatNumber();
const { sendRequest: tokentableList, loading, responseData: tokenAllocationList } = useRequest({
  request: () => tokenTableApi.tokenAllocationList().then((data) => data.data.data),
});
const { sendRequest: tokenAllocationDelete } = useRequest({
  request: (id: number) => tokenTableApi.tokenAllocationDelete({ id }).then((data) => data.data.data),
  successCallback: tokentableList,
});
const title = computed(() => tokenAllocationList.value?.name ?? '');
const rowToEdit = ref<IRow>();
const tokenTableTokenAllocationAddNewDialogIsOpen = ref(false);
// eslint-disable-next-line no-underscore-dangle
const rows = computed(() => tokenAllocationList.value?.tokentable?.token_allocation ?? []);
const columns:QTableProps['columns'] = [
  {
    label: 'Token allocation',
    field: 'round',
    name: 'round',
    align: 'left',
  },
  {
    label: '%',
    field: 'token_percent',
    name: 'token_percent',
    format: (value:number) => percentFormat(value),
  },
  {
    label: 'Token',
    field: 'token_amount',
    name: 'token_amount',
    format: (value:number) => numberFormat(value),
  },
  {
    label: 'Price, USD',
    field: 'price_usd',
    name: 'price_usd',
    format: (value:number) => currencyFormat(value, undefined, 2),
  },
  {
    label: 'Raise, USD',
    field: 'raise_usd',
    name: 'raise_usd',
    format: (value:number) => currencyFormat(value),
  },
  {
    label: 'FDV, USD',
    field: 'raise_usd',
    name: 'raise_usd',
    format: (value:number) => currencyFormat(value),
  },
  {
    label: 'TGE, %',
    field: 'tge_percent',
    name: 'tge_percent',
    format: (value:number) => percentFormat(value),
  },
  {
    label: 'TGE, tokens',
    field: 'tge_amount',
    name: 'tge_amount',
    format: (value:number) => numberFormat(value),
  },
  {
    label: 'P-TGE, %',
    field: 'post_tge_percent',
    name: 'post_tge_percent',
    format: (value:number) => percentFormat(value),
  },
  {
    label: 'P-TGE, tokens',
    field: 'post_tge_amount',
    name: 'post_tge_amount',
    format: (value:number) => numberFormat(value),
  },
  {
    label: 'Cliff (M)',
    field: 'cliff_months',
    name: 'cliff_months',
    format: (value:number) => numberFormat(value),
  },
  {
    label: 'Vesting (M)',
    field: 'vesting_months',
    name: 'vesting_months',
    format: (value:number) => numberFormat(value),
  },
  {
    label: 'Vesting (%/M)',
    field: 'vesting_months',
    name: 'vesting_months',
    // format: (value:number) => numberFormat(value),
    format: (value:number) => '?',
  },
  {
    label: 'Actions',
    field: 'actions',
    name: 'actions',
  },
];
const chartData = computed<ChartData<'pie', number[]>>(() => ({
  labels: rows.value.map(({ round }) => round),
  datasets: [
    {
      backgroundColor: COLORS,
      // eslint-disable-next-line camelcase
      data: rows.value.map(({ token_percent }) => token_percent!),
    },
  ],
}));
const chartOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Token Allocation',
    },
  },
};

const totalRow = computed<ITotalRow>(() => rows.value?.reduce((acc, item) => {
  acc.token_amount! += item.token_amount ?? 0;
  acc.token_percent! += item.token_percent ?? 0;
  acc.raise_usd! += item.raise_usd ?? 0;
  acc.price_usd! += item.price_usd ?? 0;
  acc.tge_amount! += item.tge_amount ?? 0;
  acc.tge_percent! += item.tge_percent ?? 0;
  acc.post_tge_amount! += item.post_tge_amount ?? 0;
  acc.post_tge_percent! += item.post_tge_percent ?? 0;

  return acc;
}, {
  token_amount: 0,
  token_percent: 0,
  raise_usd: 0,
  price_usd: 0,
  tge_amount: 0,
  tge_percent: 0,
  post_tge_amount: 0,
  post_tge_percent: 0,
} as ITotalRow) ?? {});

function deleteItem(row: IRow) {
  dialog({
    title: 'Delete token allocation',
    message: `Delete token allocation ${row.round}?`,
    cancel: true,
    persistent: true,
  }).onOk(() => tokenAllocationDelete(row.id!));
}

function editItem(row: IRow) {
  rowToEdit.value = row;
  tokenTableTokenAllocationAddNewDialogIsOpen.value = true;
}

function onTokenAllocationCreated() {
  tokentableList();
  tokenTableTokenAllocationAddNewDialogIsOpen.value = false;
}

tokentableList();
</script>
