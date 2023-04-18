<template>
  <div class="q-pa-md">
    <div class="row items-center">
      <div class="col-6">
        <router-link :to="{name: RouteNames.ProjectEdit}">
          <q-card
            flat
            bordered
          >
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
                      {{ formatFromTimestamp(projectInformation?.created_at) }}
                    </q-item-section>
                  </q-item>
                  <q-item dense>
                    <q-item-section>
                      max token supply:
                    </q-item-section>
                    <q-item-section>
                      {{ projectInformation?.max_token_supply }}
                    </q-item-section>
                  </q-item>
                  <q-item dense>
                    <q-item-section>
                      token network:
                    </q-item-section>
                    <q-item-section>
                      {{ projectInformation?.token_network }}
                    </q-item-section>
                  </q-item>
                  <q-item dense>
                    <q-item-section>
                      token ticker:
                    </q-item-section>
                    <q-item-section>
                      {{ projectInformation?.token_ticker }}
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </q-card-section>
          </q-card>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { RouteNames } from '@/router/routeNames';

import { useDateFormatters } from '@/composition/useFormatters';
import { useProjectStore } from '@/store/project';

const { project: projectInformation } = useProjectStore();
const { formatFromTimestamp } = useDateFormatters();
const title = computed(() => projectInformation.value?.name ?? '');
</script>
