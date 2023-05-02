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
                Create New Round
              </div>
              <div class="q-mt-lg text-center text-h6 text-grey-7">
                Please enter round information to start a new round
              </div>
            </q-card-section>
            <q-card-section>
              <div class="column q-gutter-xl">
                <q-input
                  v-model="round.name"
                  outlined
                  label="Round Name"
                  :rules="defaultRequiredRules"
                />
                <ui-number-field
                  v-model="round.token_percentage"
                  label="Token Percentage"
                  :min-value="0"
                  :max-value="100"
                  :rules="[numberRequiredRule]"
                />
                <ui-number-field
                  v-model="round.token_price_usd"
                  label="Price Per Token"
                  :min-value="0"
                  step="0.00"
                  :rules="[numberRequiredRule]"
                />
                <fundraising-unlock-schemes-select
                  v-model="allocationId"
                  label="Unlock"
                  :rules="defaultRequiredRules"
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import UiNumberField from '@/components/ui/UiNumberField.vue';
import { FundraisingRoundInput } from '@/types/fundraising';
import { useValidationRules } from '@/composition/useValidationRules';
import FundraisingUnlockSchemesSelect from '@/components/Fundraising/FundraisingUnlockSchemesSelect.vue';
import { createApiInstance } from '@/api/token';
import { Fundraising } from '@/api/token/Fundraising';
import useRequest from '@/composition/useRequest';
import { RouteNames } from '@/router/routeNames';

const router = useRouter();

const fundraisingApi = createApiInstance(Fundraising);
const { defaultRequiredRules, numberRequiredRule } = useValidationRules();
const round = ref<FundraisingRoundInput>({
  name: '',
  token_percentage: 0,
  token_price_usd: 0,
  allocation_id: 0,
});
const allocationId = ref();
const { loading, sendRequest: roundCreate } = useRequest({
  request: () => fundraisingApi.roundCreate({
    ...round.value,
    allocation_id: allocationId.value,
  }).then((data) => data!.data!.data),
  successCallback: ({ id }) => router.push({ name: RouteNames.FundraisingRound, params: { id } }),
});
</script>
