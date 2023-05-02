<template>
  <div
    v-if="round"
    class="q-pa-md"
  >
    {{ roundId }}
  </div>
  <q-spinner
    v-else
    size="xl"
    color="primary"
    class="absolute-center"
  />
</template>

<script lang="ts" setup>
import useRequest from '@/composition/useRequest';
import { createApiInstance } from '@/api/token';
import { Fundraising } from '@/api/token/Fundraising';

const props = defineProps<{
    roundId: number
}>();

const fundraisingApi = createApiInstance(Fundraising);
const { sendRequest: loadRound, responseData: round } = useRequest({
  request: () => fundraisingApi.roundList({ id: props.roundId }).then((data) => data!.data!.data!),
});

loadRound();
</script>
