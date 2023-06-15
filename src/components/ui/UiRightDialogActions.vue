<template>
  <q-card-actions
    class="right-dialog-actions q-px-lg"
    :class="{
      'show-shadow': !hideShadow
    }"
    align="right"
  >
    <slot />

    <q-btn
      v-if="!hideCancelButton"
      class="v-btn q-px-md"
      flat
      label="Close"
      color="primary"
      type="button"
      no-caps
      @click="emits('cancel')"
    />

    <q-btn
      v-if="inForm"
      class="v-btn q-px-md"
      color="primary"
      unelevated
      no-caps
      type="submit"
      label="Save"
      :loading="loading"
      :disable="loading || disabled"
    />

    <q-btn
      v-else
      class="v-btn q-px-md"
      color="primary"
      unelevated
      no-caps
      type="button"
      label="Save"
      :loading="loading"
      :disable="loading"
      @click="emits('apply')"
    />
  </q-card-actions>
</template>

<script lang="ts" setup>
const props = defineProps<{
  loading?: boolean
  inForm?: boolean
  hideCancelButton?: boolean
  hideShadow?: boolean
  disabled?: boolean
}>();

const emits = defineEmits<{
  (e: 'cancel'): void
  (e: 'apply'): void
}>();
</script>

<style lang="scss" scoped>
.right-dialog-actions {
  &.show-shadow {
    padding-top: 12px;
    padding-bottom: 12px;
    box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%) !important;
  }
}
</style>
