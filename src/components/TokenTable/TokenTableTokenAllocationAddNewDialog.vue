<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="emits('update:model-value', $event)"
  >
    <q-card style="width: 640px">
      <q-form @submit="onSubmit">
        <q-card-section>
          <div class="text-h6">
            Add new token allocation
          </div>
        </q-card-section>
        <q-card-section>
          <div class="column q-gutter-sm">
            <q-input
              v-model="round"
              outlined
              label="Round"
              :rules="defaultRequiredRules"
            />
            <ui-number-field
              v-model="tokenPercent"
              label="Token percent"
              :max-value="100"
            />
            <ui-number-field
              v-model="tokenAmount"
              label="Token amount"
            />
            <ui-number-field
              v-model="priceUsd"
              label="Price Usd"
            />
            <ui-number-field
              v-model="raceUsd"
              label="Race Usd"
            />
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            color="primary"
            label="Apply"
            no-caps
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
import { ref } from 'vue';
import { useValidationRules } from '@/composition/useValidationRules';
import UiNumberField from '@/components/ui/UiNumberField.vue';

const props = defineProps<{
    modelValue: boolean
}>();
const emits = defineEmits<{
    (e:'update:model-value', value:boolean):void
}>();

const { defaultRequiredRules } = useValidationRules();
const round = ref('');
const tokenPercent = ref(0);
const tokenAmount = ref(0);
const priceUsd = ref(0);
const raceUsd = ref(0);

function onSubmit() {
  console.log('submit');
}
</script>
