<template>
  <q-item>
    <q-item-section avatar>
      <q-avatar
        color="greyscale-100"
        :icon="iconName"
        size="48px"
      />
    </q-item-section>
    <q-item-section>
      <q-item-label class="text-bold">
        {{ value }}
      </q-item-label>
      <q-item-label caption>
        {{ name }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts" setup>
const props = defineProps<{
  name: string;
  value: string | number;
  iconName: string;
}>();
</script>
