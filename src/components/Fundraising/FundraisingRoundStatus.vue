<template>
  <q-badge
    :color="color"
    :text-color="textColor"
  >
    <div class="text-capitalize">
      {{ status }}
    </div>
  </q-badge>
</template>

<script lang="ts" setup>
import { FundraisingRoundStatus } from '@/types/fundraising';

const props = defineProps<{
    status: FundraisingRoundStatus
}>();

const colors: Record<FundraisingRoundStatus, string> = {
  draft: 'grey-2',
  completed: 'green-1',
  archived: 'orange-1',
  ongoing: 'yellow-1',
};

const textColors: Record<FundraisingRoundStatus, string> = {
  draft: 'grey-7',
  completed: 'green-6',
  archived: 'orange-8',
  ongoing: 'yellow-8',
};
const color = colors[props.status];
const textColor = textColors[props.status];
</script>
