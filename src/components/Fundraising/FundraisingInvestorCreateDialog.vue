<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="emits('update:model-value', $event)"
  >
    <q-card style="width: 640px">
      <q-form
        greedy
        @submit="roundInvestorCreate"
      >
        <q-card-section>
          <div class="text-h6">
            {{ title }}
          </div>
        </q-card-section>
        <q-card-section>
          <div class="column q-gutter-sm">
            <ui-number-field
              v-model="roundInvestor.investment_allocation"
              label="Investment allocation"
              :min-value="0"
              :rules="[numberRequiredRule]"
            />
            <q-input
              v-model="roundInvestor.email"
              label="Email"
              outlined
              :rules="[defaultRequiredRule, emailRules]"
            />
            <q-input
              v-model="roundInvestor.wallet_address"
              label="Wallet address"
              outlined
              :rules="defaultRequiredRules"
            />
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            :loading="loading"
            color="primary"
            label="Apply"
            no-caps
            unelevated
            type="submit"
          />
          <q-btn
            v-close-popup
            outline
            color="primary"
            label="Cancel"
            no-caps
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import useRequest from '@/composition/useRequest';
import { createApiInstance } from '@/api/token';
import { Fundraising } from '@/api/token/Fundraising';
import { FundraisingRoundInvestorInput } from '@/types/fundraising';
import UiNumberField from '@/components/ui/UiNumberField.vue';
import { useValidationRules } from '@/composition/useValidationRules';

const props = defineProps<{
    modelValue: boolean,
    roundId: number
}>();
const emits = defineEmits<{
    (e:'update:model-value', value:boolean):void,
    (e:'created'):void,
}>();

const {
  numberRequiredRule, emailRules, defaultRequiredRule, defaultRequiredRules,
} = useValidationRules();
const roundInvestor = ref<FundraisingRoundInvestorInput>({
  id: props.roundId,
  investment_allocation: 0,
  email: '',
  wallet_address: '',
});
const fundraisingApi = createApiInstance(Fundraising);

const title = computed(() => 'Add new investor');

const { loading, sendRequest: roundInvestorCreate } = useRequest({
  request: () => fundraisingApi.roundInvestorCreate(roundInvestor.value!),
  successCallback: () => emits('created'),
});
</script>
