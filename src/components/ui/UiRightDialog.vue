<template>
  <q-dialog
    class="right-dialog"
    :model-value="modelValue"
    position="right"
    full-height
    maximized
    @update:model-value="emits('update:model-value', $event)"
  >
    <q-card class="right-dialog-card q-dialog-plugin">
      <slot v-if="hideActions" />

      <template v-else>
        <q-card-section class="right-dialog-content q-px-lg q-pt-lg q-pb-none">
          <slot />
        </q-card-section>

        <right-dialog-actions
          :loading="loading"
          @cancel="emits('update:model-value', false)"
          @apply="handleApply"
        />
      </template>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import RightDialogActions from '@/components/ui/UiRightDialogActions.vue';

const props = defineProps<{
  modelValue: boolean
  loading?: boolean
  hideActions?: boolean
}>();

const emits = defineEmits<{
  (e: 'update:model-value', value: boolean): void
  (e: 'apply'): void
}>();

function handleApply() {
  emits('apply');
}
</script>

<style lang="scss">
.right-dialog {
  .q-dialog__inner {
    padding-top: 0;
    padding-bottom: 0;
  }

  &-card {
    width: 100vw;
    max-width: 900px !important;
    position: static;
    display: flex;
    flex-direction: column;
  }

  &-content {
    overflow: auto;
    max-height: calc(100vh - 61px);
    flex: 1 1 auto;
    padding-bottom: 16px;
  }

  &-form {
    display: flex;
    flex-direction: column;
    height: 100%;

    :deep(.q-field__bottom) {
      padding-top: 6px;
    }
  }
}
</style>
