<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="emits('update:model-value', $event)"
  >
    <q-card style="width: 640px">
      <q-form
        novalidate
        @submit="tokenAllocationCreate"
      >
        <q-card-section>
          <div class="text-h6">
            {{ title }}
          </div>
        </q-card-section>
        <q-card-section>
          <div class="column q-gutter-sm">
            <q-input
              v-model="tokenAllocationData.round"
              outlined
              label="Round"
              :rules="defaultRequiredRules"
            />
            <ui-number-field
              v-model="tokenAllocationData.token_percent"
              label="Token percent"
              :max-value="100"
            />
            <ui-number-field
              v-model="tokenAllocationData.price_usd"
              label="Price Usd"
              step="0.00"
            />
            <ui-number-field
              v-model="tokenAllocationData.tge_percent"
              label="TGE, %"
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
import { createApiInstance } from '@/api';
import { Tokentable } from '@/api/Tokentable';
import useRequest from '@/composition/useRequest';
import { TokenAllocationInput } from '@/types/token';

const props = defineProps<{
    modelValue: boolean
    token?: TokenAllocationInput,
}>();
const emits = defineEmits<{
    (e:'update:model-value', value:boolean):void,
    (e:'created'):void,
}>();

const tokentableApi = createApiInstance(Tokentable);
const tokenAllocationData = ref<TokenAllocationInput>(props.token ? { ...props.token } : { round: '', token_percent: 0 });
const { defaultRequiredRules } = useValidationRules();
const { sendRequest: tokenAllocationCreate, loading } = useRequest({
  request: () => tokentableApi.tokenAllocationCreate(tokenAllocationData.value),
  successCallback: () => emits('created'),
});

const title = computed(() => (props.token ? `Edit ${props.token.round}` : 'Add new token allocation'));
</script>
