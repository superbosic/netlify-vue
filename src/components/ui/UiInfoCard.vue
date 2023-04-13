<template>
  <q-card
    flat
    bordered
  >
    <q-card-section>
      <div class="text-h4">
        {{ value }}
      </div>
      <div class="text-caption text-grey-7 q-mt-sm">
        {{ name }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
const props = defineProps<{
    name: string,
    value: string | number,
}>();
</script>
