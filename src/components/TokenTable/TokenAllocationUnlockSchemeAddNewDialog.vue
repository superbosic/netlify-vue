<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="emits('update:model-value', $event)"
  >
    <q-card style="width: 640px">
      <q-form
        novalidate
        @submit="tokenAllocationUnlockSchemeCreate"
      >
        <q-card-section>
          <div class="text-h6">
            {{ title }}
          </div>
        </q-card-section>
        <q-card-section>
          <div class="column q-gutter-md">
            <q-select
              v-model="tokenAllocationUnlockSchemeInputData.type"
              :options="['onetime', 'liner']"
              outlined
              label="Type"
            />
            <ui-number-field
              v-model="tokenAllocationUnlockSchemeInputData.month_after_tge"
              label="Month after TGE"
              :rules="[numberRequiredRule]"
            />
            <ui-number-field
              v-if="tokenAllocationUnlockSchemeInputData.type === 'onetime'"
              v-model="tokenAllocationUnlockSchemeInputData.percent"
              label="Token percent"
              :max-value="100"
              :rules="[numberRequiredRule]"
            />
            <ui-number-field
              v-if="tokenAllocationUnlockSchemeInputData.type === 'liner'"
              v-model="tokenAllocationUnlockSchemeInputData.vesting_months"
              label="Vesting Months"
              :rules="[numberRequiredRule]"
            />
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            :loading="loading"
            color="primary"
            label="Apply"
            no-caps
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
import { useValidationRules } from '@/composition/useValidationRules';
import UiNumberField from '@/components/ui/UiNumberField.vue';
import { createApiInstance } from '@/api/token';
import { Tokentable } from '@/api/token/Tokentable';
import useRequest from '@/composition/useRequest';
import { TokenAllocationListItem, TokenAllocationUnlockSchemeInput } from '@/types/token';

const props = defineProps<{
    modelValue: boolean
    token: TokenAllocationListItem,
}>();
const emits = defineEmits<{
    (e:'update:model-value', value:boolean):void,
    (e:'created'):void,
}>();

const tokentableApi = createApiInstance(Tokentable);
const tokenAllocationUnlockSchemeInputData = ref<TokenAllocationUnlockSchemeInput>(
  {
    tokentable_allocation_id: props.token.id!,
    type: 'onetime',
    month_after_tge: 0,
  },
);
const { numberRequiredRule } = useValidationRules();
const { sendRequest: tokenAllocationUnlockSchemeCreate, loading } = useRequest({
  request: () => tokentableApi.tokenAllocationUnlockSchemeCreate(tokenAllocationUnlockSchemeInputData.value),
  successCallback: () => emits('created'),
});

const title = computed(() => (props.token ? `Edit ${props.token.round}` : 'Add new token allocation'));
</script>
