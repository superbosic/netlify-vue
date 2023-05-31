<template>
  <div class="row justify-between">
    <div class="col text-body-dark">
      {{ name }}:
    </div>
    <div class="col">
      {{ value }}
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  name: string;
  value?: string | number;
}>();
</script>
