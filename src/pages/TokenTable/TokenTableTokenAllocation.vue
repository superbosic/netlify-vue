<template>
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
  </q-table>
  <token-table-token-allocation-add-new-dialog
    v-model="tokenTableTokenAllocationAddNewDialogIsOpen"
    @created="onTokenAllocationCreated"
  />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { QTableProps } from 'quasar';
import { createApiInstance } from '@/api';
import { Tokentable } from '@/api/Tokentable';
import useRequest from '@/composition/useRequest';
import { useDateFormatters, useFormatNumber } from '@/composition/useFormatters';
import TokenTableTokenAllocationAddNewDialog from '@/components/TokenTable/TokenTableTokenAllocationAddNewDialog.vue';

const tokenTableApi = createApiInstance(Tokentable);
const { formatFromTimestamp } = useDateFormatters();
const { numberFormat, currencyFormat, percentFormat } = useFormatNumber();
const { sendRequest: tokentableList, loading, responseData: tokenAllocationList } = useRequest({
  request: () => tokenTableApi.tokenAllocationList().then((data) => data.data.data),
});
const title = computed(() => tokenAllocationList.value?.name ?? '');
const tokenTableTokenAllocationAddNewDialogIsOpen = ref(false);
// eslint-disable-next-line no-underscore-dangle
const rows = computed(() => tokenAllocationList.value?.tokentable?.token_allocation ?? []);
const columns:QTableProps['columns'] = [
  {
    label: 'Token allocation',
    field: 'round',
    name: 'round',
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
    format: (value:number) => currencyFormat(value),
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
];

function onTokenAllocationCreated() {
  tokentableList();
  tokenTableTokenAllocationAddNewDialogIsOpen.value = false;
}

tokentableList();
</script>
