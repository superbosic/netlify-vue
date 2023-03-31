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
  <token-table-token-allocation-add-new-dialog v-model="tokenTableTokenAllocationAddNewDialogIsOpen" />
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
