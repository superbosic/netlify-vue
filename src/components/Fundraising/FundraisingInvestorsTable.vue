<template>
  <q-table
    :columns="columns"
    :rows="investors"
    :pagination="{ rowsPerPage: 0 }"
    hide-pagination
    flat
    bordered
  />
</template>

<script lang="ts" setup>
import { QTableProps } from 'quasar';
import { InvestorsListItem } from '@/types/fundraising';
import { useFormatNumber } from '@/composition/useFormatters';

const props = defineProps<{
    investors: InvestorsListItem[],
}>();

const { currencyFormat } = useFormatNumber();
const columns: QTableProps['columns'] = [
  {
    label: 'Investor',
    name: 'name',
    field: 'name',
  },
  {
    label: 'Wallet Address',
    name: 'wallet_address',
    field: 'wallet_address',
  },
  {
    label: 'Email',
    name: 'email',
    field: 'email',
  },
  {
    label: 'Allocation',
    name: 'investment_allocation',
    field: 'investment_allocation',
    format: (val) => currencyFormat(val),
  },
  {
    label: 'Status',
    name: 'status',
    field: 'status',
    format: (val) => currencyFormat(val),
  },
];
</script>
