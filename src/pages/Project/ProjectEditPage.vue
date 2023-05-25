<template>
  <div class="q-pa-md">
    <div class="row justify-center">
      <div class="col-6">
        <q-card flat>
          <q-form
            greedy
            @submit="roundCreate"
          >
            <q-card-section>
              <div class="text-center text-h4 text-grey-9">
                {{ title }}
              </div>
            </q-card-section>
            <q-card-section>
              <div class="column q-gutter-xl">
                <q-input
                  v-model="projectInput.name"
                  outlined
                  label="Project Name"
                  :rules="defaultRequiredRules"
                />
                <ui-number-field
                  v-model="projectInput.max_token_supply"
                  label="Max Token Supply"
                  :min-value="0"
                  :rules="[numberRequiredRule]"
                />
                <q-input
                  v-model="projectInput.token_ticker"
                  outlined
                  label="Token Ticker"
                  :rules="defaultRequiredRules"
                />
                <q-select
                  v-model="projectInput.token_network"
                  outlined
                  label="Token Network"
                  :options="['polygon', 'ethereum', 'fantom', 'binance_smart_chain', 'avalanche']"
                />
              </div>
            </q-card-section>
            <q-card-actions>
              <q-btn
                class="full-width"
                label="Confirm"
                type="submit"
                color="primary"
                no-caps
                unelevated
                :loading="loading"
              />
            </q-card-actions>
          </q-form>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import UiNumberField from '@/components/ui/UiNumberField.vue';
import { createApiInstance } from '@/api/token';
import { Project } from '@/api/token/Project';
import { useValidationRules } from '@/composition/useValidationRules';
import useRequest from '@/composition/useRequest';
import { RouteNames } from '@/router/routeNames';
import { ProjectInput } from '@/types/project';
import { useProjectStore } from '@/store/project';

const router = useRouter();

const { project } = useProjectStore();
const projectApi = createApiInstance(Project);
const { defaultRequiredRules, numberRequiredRule } = useValidationRules();
const projectInput = ref<ProjectInput>({
  name: project.value?.name ?? '',
  max_token_supply: project.value?.max_token_supply ?? 0,
  token_network: project.value?.token_network ?? 'polygon',
  token_ticker: project.value?.token_ticker ?? '',
});
const title = computed(() => (project.value ? `Edit ${project.value.name} project` : 'Create New Project'));
const { loading, sendRequest: roundCreate } = useRequest({
  request: () => projectApi.projectCreate(projectInput.value).then((data) => data!.data!.data),
  successCallback: () => router.push({ name: RouteNames.Dashboard }),
});
</script>
