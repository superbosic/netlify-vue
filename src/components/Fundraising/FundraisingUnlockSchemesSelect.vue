<template>
  <q-select
    :model-value="modelValue"
    outlined
    :label="label"
    :options="options"
    :loading="loading"
    :rules="rules"
    emit-value
    map-options
    option-value="id"
    @update:model-value="emits('update:model-value', $event)"
  >
    <template #selected-item="scope">
      <div
        v-for="(scheme, index) in scope.opt.unlock_scheme"
        :key="index"
      >
        {{ unlockSchemeToString(scheme) }}
      </div>
    </template>
    <template #option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section>
          <div
            v-for="(scheme, index) in scope.opt.unlock_scheme"
            :key="index"
          >
            {{ unlockSchemeToString(scheme) }}
          </div>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { QSelectProps } from 'quasar';
import useRequest from '@/composition/useRequest';
import { createApiInstance } from '@/api';
import { Fundraising } from '@/api/Fundraising';
import { useToken } from '@/composition/business/useToken';

const props = defineProps<{
    modelValue?: number,
    label: string,
    rules?: QSelectProps['rules']
}>();
const emits = defineEmits<{
    (e: 'update:model-value', value: number):void
}>();

const fundraisingApi = createApiInstance(Fundraising);
const { loading, sendRequest: availableUnlockSchemesList, responseData: schemes } = useRequest({
  request: () => fundraisingApi.availableUnlockSchemesList().then((data) => data!.data!.data!),
});
const { unlockSchemeToString } = useToken();

const options = computed(() => schemes.value?.filter(({ unlock_scheme }) => unlock_scheme!.length > 0) ?? []);

availableUnlockSchemesList();
</script>
