<template>
  <div class="q-pa-md">
    <div class="q-gutter-md">
      <q-card
        v-for="task in tasks || []"
        :key="task.id"
        flat
        bordered
      >
        <q-card-section>
          <q-table
            :columns="columns"
            :rows="task.fundraising_rounds"
            :pagination="{ rowsPerPage: 0 }"
            hide-pagination
            flat
          >
            <template #body-cell-projectName>
              <q-td>
                {{ task.name }}
              </q-td>
            </template>
            <template #body-cell-allocation="{ row }">
              <q-td class="text-right">
                {{ currencyFormat(row.investor.investment_allocation) }}
              </q-td>
            </template>
            <template #body-cell-tokenPrice="{ row }">
              <q-td class="text-right">
                {{ currencyFormat(row.token_price_usd) }}
              </q-td>
            </template>
            <template #body-cell-unlock_scheme="{ row }">
              <q-td class="text-right">
                {{ unlockSchemeToString(row.unlock_scheme) }}
              </q-td>
            </template>
          </q-table>
        </q-card-section>
        <!--        <q-card-section>
          <div class="row">
            <div class="col-auto">
              <q-card
                flat
                bordered
              >
                <q-card-section>
                  <div class="row q-gutter-md">
                    <div class="q-pa-xs bg-grey-5 rounded-borders">
                      <q-icon
                        name="format_list_bulleted"
                        color="white"
                        size="lg"
                      />
                    </div>
                    <div>
                      <div class="text-bold text-body2">
                        Contract.pdf
                      </div>
                      <div class="text-caption text-grey-6">
                        Created on: {{ formatFromTimestamp(Date.now()) }}
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-card-section>-->
      </q-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { QTableProps } from 'quasar';
import { useDateFormatters, useFormatNumber } from '@/composition/useFormatters';
import { createApiInstance } from '@/api/token';
import { Tasks } from '@/api/token/Tasks';
import useRequest from '@/composition/useRequest';
import { useToken } from '@/composition/business/useToken';

const tasksApi = createApiInstance(Tasks);
const { formatFromTimestamp } = useDateFormatters();
const { currencyFormat } = useFormatNumber();
const { unlockSchemeToString } = useToken();
const { loading, sendRequest: tasksList, responseData: tasks } = useRequest({
  request: () => tasksApi.tasksList().then((data) => data.data.data),
});
const columns:QTableProps['columns'] = [
  {
    label: 'Project',
    name: 'projectName',
    field: 'projectName',
  },
  {
    label: 'Allocation',
    name: 'allocation',
    field: 'allocation',
  },
  {
    label: 'Token Price',
    name: 'tokenPrice',
    field: 'tokenPrice',
  },
  {
    label: 'Unlocking Schedule',
    name: 'unlock_scheme',
    field: 'unlock_scheme',
  },
  {
    label: 'Status',
    name: 'status',
    field: 'status',
  },
  {
    label: 'Action',
    name: 'action',
    field: 'action',
  },
];

tasksList();
</script>
