<template>
  <q-card
    flat
    bordered
  >
    <template v-if="projectInformation">
      <q-card-section>
        <div class="text-h5">
          {{ title }}
        </div>
      </q-card-section>
      <q-card-section>
        <div style="max-width: 350px">
          <q-list>
            <q-item dense>
              <q-item-section>
                created at:
              </q-item-section>
              <q-item-section>
                {{ formatFromTimestamp(projectInformation?.tokentable?.created_at) }}
              </q-item-section>
            </q-item>
            <q-item dense>
              <q-item-section>
                max token supply:
              </q-item-section>
              <q-item-section>
                {{ projectInformation?.tokentable?.max_token_supply }}
              </q-item-section>
            </q-item>
            <q-item dense>
              <q-item-section>
                vesting period:
              </q-item-section>
              <q-item-section>
                {{ projectInformation?.tokentable?.vesting_period }}
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card-section>
    </template>
    <q-card-section v-else>
      <div class="row justify-center">
        <q-spinner
          size="3em"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { createApiInstance } from '@/api';
import { Tokentable } from '@/api/Tokentable';
import useRequest from '@/composition/useRequest';
import { useDateFormatters } from '@/composition/useFormatters';

const { formatFromTimestamp } = useDateFormatters();
const tokenTableApi = createApiInstance(Tokentable);
const { sendRequest: tokentableList, responseData: projectInformation } = useRequest({
  request: () => tokenTableApi.projectInformationList().then((data) => data.data.data),
});
const title = computed(() => projectInformation.value?.name ?? '');

tokentableList();
</script>
