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
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { QTableProps } from 'quasar';
import { createApiInstance } from '@/api';
import { Tokentable } from '@/api/Tokentable';
import useRequest from '@/composition/useRequest';
import { useDateFormatters, useFormatNumber } from '@/composition/useFormatters';

const tokenTableApi = createApiInstance(Tokentable);
const { formatFromTimestamp } = useDateFormatters();
const { numberFormat, currencyFormat, percentFormat } = useFormatNumber();
const { sendRequest: tokentableList, loading, responseData: tokenAllocationList } = useRequest({
  request: () => tokenTableApi.tokenAllocationList().then((data) => data.data.data),
});
const title = computed(() => tokenAllocationList.value?.name ?? '');
// eslint-disable-next-line no-underscore-dangle
const rows = computed(() => tokenAllocationList.value?.tokentable?._token_allocation ?? []);
const columns:QTableProps['columns'] = [
  {
    label: 'created at',
    field: 'created_at',
    name: 'created_at',
    format: (value:number) => formatFromTimestamp(value),
  },
  {
    label: 'tokentable id',
    field: 'tokentable_id',
    name: 'tokentable_id',
  },
  {
    label: 'round',
    field: 'round',
    name: 'round',
  },
  {
    label: 'token percent',
    field: 'token_percent',
    name: 'token_percent',
    format: (value:number) => percentFormat(value),
  },
  {
    label: 'token amount',
    field: 'token_amount',
    name: 'token_amount',
    format: (value:number) => numberFormat(value),
  },
  {
    label: 'price usd',
    field: 'price_usd',
    name: 'price_usd',
    format: (value:number) => currencyFormat(value),
  },
  {
    label: 'raise usd',
    field: 'raise_usd',
    name: 'raise_usd',
    format: (value:number) => currencyFormat(value),
  },
];

tokentableList();
</script>
