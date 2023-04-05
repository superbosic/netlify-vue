<template>
  <q-input
    :model-value="modelValue"
    :label="label"
    :rules="innerRules"
    :suffix="suffix"
    :step="step"
    :dense="dense"
    outlined
    type="number"
    :hide-bottom-space="hideBottomSpace"
    :debounce="debounce"
    @update:model-value="emitChanges"
  />
</template>

<script lang="ts" setup>
import { QInput } from 'quasar';
import { computed } from 'vue';
import { MAX_INT32, useValidationRules } from '@/composition/useValidationRules';

const props = withDefaults(defineProps<{
    modelValue?: number,
    label: QInput['label'],
    rules?: QInput['rules'],
    dense?: boolean,
    minValue?: number,
    maxValue?: number,
    suffix?: string,
    hideBottomSpace?: boolean
    debounce?: number,
    step?: string,
}>(), {
  minValue: 0,
  maxValue: MAX_INT32,
  modelValue: undefined,
  suffix: undefined,
  debounce: undefined,
  step: undefined,
  rules: () => [],
});

const emit = defineEmits<{
    (e: 'update:modelValue', value?: number):void
}>();

const { numberCustomMinValue, numberCustomMaxValue } = useValidationRules();

const innerRules = computed(() => [
  numberCustomMinValue(props.minValue),
  numberCustomMaxValue(props.maxValue),
  ...props.rules,
]);

function emitChanges(value: string | number | null) {
  const modelValue = Number.parseFloat(value as string);

  emit('update:modelValue', Number.isNaN(modelValue) ? undefined : modelValue);
}
</script>
