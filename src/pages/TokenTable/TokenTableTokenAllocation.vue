<template>
  <div
    v-if="tokenAllocationList"
    class="q-gutter-md"
  >
    <div>
      <q-table
        key="id"
        :title="title"
        :loading="loading"
        :rows="rows"
        :columns="columns"
        :pagination="{ rowsPerPage: 0 }"
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
              @click="addNewTokenClick"
            />
          </div>
        </template>

        <template #body-cell-unlock_scheme="{ row }">
          <q-td>
            <div
              v-for="item in row.unlock_scheme"
              :key="item.id"
              class="row items-center no-wrap justify-end"
            >
              <div>
                {{ unlockSchemeToString(item) }}
              </div>
              <q-btn
                icon="close"
                color="negative"
                flat
                padding="4px"
                :loading="tokenAllocationUnlockSchemeDeleteLoading"
                @click="tokenAllocationUnlockSchemeDelete(item)"
              />
              <q-btn
                icon="add"
                color="primary"
                flat
                padding="4px"
                @click="addTokenAllocationUnlockScheme(row)"
              />
            </div>
          </q-td>
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
            <q-td />
            <q-td class="text-bold text-right">
              {{ currencyFormat(totalRow.raise_usd) }}
            </q-td>
            <q-td />
            <q-td />
            <q-td class="text-bold text-right">
              {{ numberFormat(totalRow.tge_amount) }}
            </q-td>
            <q-td />
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

      <token-allocation-unlock-scheme-add-new-dialog
        v-if="tokenAllocationUnlockSchemeAddNewDialogIsOpen"
        v-model="tokenAllocationUnlockSchemeAddNewDialogIsOpen"
        :token="rowToEdit!"
        @created="onTokenAllocationUnlockSchemeCreated"
      />
    </div>
    <div>
      <q-card
        flat
        bordered
      >
        <q-card-section>
          <chart
            :options="chartOptions"
          />
        </q-card-section>
        <q-card-section>
          <chart
            :options="unlockTokensByMonthTotalChartOptions"
          />
        </q-card-section>
      </q-card>
    </div>
    <div>
      <token-table-token-allocation-by-months
        v-model:months="months"
        :token-allocation-data="rows"
        :max-token-supply="maxTokenSupply"
        :tge-tokens-total="totalRow?.tge_amount ?? 0"
        :min-months="minMonths"
        :max-months="maxMonths"
      />
    </div>
    <div>
      <token-table-token-allocation-by-years
        :token-allocation-data="rows"
        :max-token-supply="maxTokenSupply"
        :tge-tokens-total="totalRow?.tge_amount ?? 0"
      />
    </div>
  </div>
  <q-card-section v-else>
    <div class="row justify-center">
      <q-spinner
        size="3em"
      />
    </div>
  </q-card-section>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { QTableProps, useQuasar } from 'quasar';
import { Chart } from 'highcharts-vue';
import { createApiInstance } from '@/api';
import { Tokentable } from '@/api/Tokentable';
import useRequest from '@/composition/useRequest';
import { useFormatNumber } from '@/composition/useFormatters';
import TokenTableTokenAllocationAddNewDialog from '@/components/TokenTable/TokenTableTokenAllocationAddNewDialog.vue';
import { TokenAllocationListItem, TokenAllocationListItemUnlockScheme } from '@/types/token';
import TokenTableTokenAllocationByMonths from '@/components/TokenTable/TokenTableTokenAllocationByMonths.vue';
import TokenTableTokenAllocationByYears from '@/components/TokenTable/TokenTableTokenAllocationByYears.vue';
import TokenAllocationUnlockSchemeAddNewDialog
  from '@/components/TokenTable/TokenAllocationUnlockSchemeAddNewDialog.vue';
import { useToken } from '@/composition/business/useToken';

type ITotalRow = Pick<TokenAllocationListItem, 'token_amount' | 'token_percent' | 'tge_amount' | 'raise_usd' | 'post_tge_amount'>;
const { dialog } = useQuasar();
const tokenTableApi = createApiInstance(Tokentable);
const { numberFormat, currencyFormat, percentFormat } = useFormatNumber();
const { unlockSchemeToString } = useToken();
const { sendRequest: tokentableList, loading, responseData: tokenAllocationList } = useRequest({
  request: () => tokenTableApi.tokenAllocationList().then((data) => data.data.data),
});
const { sendRequest: tokenAllocationDelete } = useRequest({
  request: (id: number) => tokenTableApi.tokenAllocationDelete({ id }).then((data) => data.data.data),
  successCallback: tokentableList,
});
const { sendRequest: tokenAllocationUnlockSchemeDelete, loading: tokenAllocationUnlockSchemeDeleteLoading } = useRequest({
  request: ({ id, tokentable_allocation_id }: TokenAllocationListItemUnlockScheme) =>
    tokenTableApi.tokenAllocationUnlockSchemeDelete({ id: id!, tokentable_allocation_id: tokentable_allocation_id! }),
  successCallback: tokentableList,
});
const title = computed(() => tokenAllocationList.value?.name ?? '');
const maxTokenSupply = computed(() => tokenAllocationList.value?.tokentable?.max_token_supply ?? 0);
const rowToEdit = ref<TokenAllocationListItem>();
const tokenTableTokenAllocationAddNewDialogIsOpen = ref(false);
const tokenAllocationUnlockSchemeAddNewDialogIsOpen = ref(false);

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
    format: (value:number) => currencyFormat(value, undefined, 4),
  },
  {
    label: 'Raise, USD',
    field: 'raise_usd',
    name: 'raise_usd',
    format: (value:number) => currencyFormat(value),
  },
  {
    label: 'FDV, USD',
    field: 'fdv_usd',
    name: 'fdv_usd',
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
    label: 'Unlock',
    field: 'unlock_scheme',
    name: 'unlock_scheme',
  },
  {
    label: 'Actions',
    field: 'actions',
    name: 'actions',
  },
];
const chartOptions = computed(() => ({
  chart: {
    type: 'pie',
  },
  title: {
    text: 'Token Allocation',
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
      },
    },
  },
  series: [
    {
      data: rows.value.map(({ round, token_percent }) => ({
        name: round,
        y: token_percent!,
      })),
      color: '#6fcd98',
    },
  ],
  credits: {
    enabled: false,
  },
}));
const unlockTokensByMonthTotalChartOptions = computed(() => {
  const monthsList = Array.from(new Array(months.value), (_, index) => index + 1);
  const series = rows.value?.map((token) => ({
    name: token.round,
    data: monthsList.reduce((acc, currentMonthNumber, i) => {
      if (currentMonthNumber > token.cliff_months! && currentMonthNumber <= (token.cliff_months! + token.vesting_months!)) {
        const value = token.post_tge_amount! / token.vesting_months!;

        if (typeof acc[i - 1] === 'number') {
          acc.push(acc[i - 1] + value);
        } else {
          acc.push(value);
        }
      } else {
        acc.push(acc[i - 1] ?? 0);
      }

      return acc;
    }, [] as number[]),
  }));

  return {
    chart: {
      type: 'area',
    },
    title: {
      text: 'Unlock tokens by month total',
      align: 'left',
    },
    yAxis: {
      opposite: true,
      title: {
        text: 'Tokens',
      },
    },
    tooltip: {
      shared: true,
      headerFormat: '<span style="font-size:12px"><b>{point.key}</b></span><br>',
    },
    plotOptions: {
      series: {
        pointStart: 1,
      },
      area: {
        stacking: 'normal',
        lineColor: '#666666',
        lineWidth: 1,
        marker: {
          enabled: false,
        },
      },
    },
    series,
    credits: {
      enabled: false,
    },
  };
});

const totalRow = computed<ITotalRow>(() => rows.value?.reduce((acc, item) => {
  acc.token_amount! += item.token_amount ?? 0;
  acc.token_percent! += item.token_percent ?? 0;
  acc.raise_usd! += item.raise_usd ?? 0;
  acc.tge_amount! += item.tge_amount ?? 0;
  acc.post_tge_amount! += item.post_tge_amount ?? 0;

  return acc;
}, {
  token_amount: 0,
  token_percent: 0,
  raise_usd: 0,
  tge_amount: 0,
  post_tge_amount: 0,
} as ITotalRow) ?? {});

function deleteItem(row: TokenAllocationListItem) {
  dialog({
    title: 'Delete token allocation',
    message: `Delete token allocation ${row.round}?`,
    cancel: true,
    persistent: true,
  }).onOk(() => tokenAllocationDelete(row.id!));
}

function editItem(row: TokenAllocationListItem) {
  rowToEdit.value = row;
  tokenTableTokenAllocationAddNewDialogIsOpen.value = true;
}

function onTokenAllocationCreated() {
  rowToEdit.value = undefined;
  tokentableList();
  tokenTableTokenAllocationAddNewDialogIsOpen.value = false;
}

function onTokenAllocationUnlockSchemeCreated() {
  rowToEdit.value = undefined;
  tokentableList();
  tokenAllocationUnlockSchemeAddNewDialogIsOpen.value = false;
}

function addNewTokenClick() {
  rowToEdit.value = undefined;
  tokenTableTokenAllocationAddNewDialogIsOpen.value = true;
}

function addTokenAllocationUnlockScheme(row: TokenAllocationListItem) {
  rowToEdit.value = row;
  tokenAllocationUnlockSchemeAddNewDialogIsOpen.value = true;
}

tokentableList();
</script>
