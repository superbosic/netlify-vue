<template>
  <div class="q-pa-md">
    <q-card
      v-if="project"
      flat
      bordered
    >
      <q-card-section>
        <div class="row">
          <div class="col-auto">
            <div class="row q-col-gutter-md">
              <div>
                <q-avatar
                  icon="person"
                  color="grey-6"
                  text-color="white"
                />
              </div>
              <div class="col">
                <div class="text-bold">
                  {{ project.name }}
                </div>
                <div class="text-caption text-grey-7">
                  Vesting
                </div>
              </div>
            </div>
          </div>
          <q-space />
          <div class="row q-gutter-lg">
            <div class="col-auto">
              <div>
                <div class="text-bold">
                  {{ currencyFormat(12000000) }}
                </div>
                <div class="text-caption text-grey-7">
                  Current Valuation
                </div>
              </div>
            </div>
            <div class="col-auto">
              <div>
                <div class="text-bold">
                  {{ currencyFormat(1000000) }}
                </div>
                <div class="text-caption text-grey-7">
                  Total Investment
                </div>
              </div>
            </div>
            <div class="col-auto">
              <div>
                <div class="text-bold text-capitalize">
                  {{ project.token_network }}
                </div>
                <div class="text-caption text-grey-7">
                  Network
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-table
          flat
          :columns="columns"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import { QTableProps } from 'quasar';
import { useProjectStore } from '@/store/project';
import { useFormatNumber } from '@/composition/useFormatters';
import { createApiInstance } from '@/api/token';
import { Portfolio } from '@/api/token/Portfolio';
import useRequest from '@/composition/useRequest';

const { project } = useProjectStore();
const { currencyFormat } = useFormatNumber();
const portfolioApi = createApiInstance(Portfolio);
const { loading, sendRequest: portfolioList } = useRequest({
  request: () => portfolioApi.portfolioList(),
});

const columns: QTableProps['columns'] = [
  {
    label: 'Round',
    name: 'name',
    field: 'name',
  },
  {
    label: 'Valuation',
    name: 'valuation',
    field: 'valuation',
  },
  {
    label: 'Investment',
    name: 'investment',
    field: 'investment',
  },
  {
    label: 'Unlocked Schedule',
    name: 'unlocked_schedule',
    field: 'unlocked_schedule',
  },
  {
    label: 'Contracts',
    name: 'contracts',
    field: 'contracts',
  },
];

portfolioList();
</script>
