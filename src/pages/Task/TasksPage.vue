<template>
  <div class="q-pa-md">
    <q-card
      flat
      bordered
    >
      <q-card-section>
        <q-table
          :columns="columns"
          :rows="[]"
          flat
        />
      </q-card-section>
      <q-card-section>
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
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import { QTableProps } from 'quasar';
import { useDateFormatters } from '@/composition/useFormatters';
import { createApiInstance } from '@/api/token';
import { Tasks } from '@/api/token/Tasks';
import useRequest from '@/composition/useRequest';

const tasksApi = createApiInstance(Tasks);
const { formatFromTimestamp } = useDateFormatters();
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
    name: 'unlockingSchedule',
    field: 'unlockingSchedule',
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
