<template>
  <div>
    <div class="row items-center">
      <div class="row items-center">
        <q-badge
          rounded
          :color="color"
        />
      </div>
      <div class="q-ml-md text-caption text-grey-7">
        {{ name }}
      </div>
    </div>
    <div class="text-h4 q-ml-lg">
      {{ value }}
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    name: string,
    value: string | number,
    color: string,
}>();
</script>
