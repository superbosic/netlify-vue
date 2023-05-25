<template>
  <q-drawer
    v-model="isOpen"
    show-if-above
    side="left"
    class="navigation-panel"
  >
    <div class="navigation-panel__logo" />
    <q-separator class="navigation-panel__separator" />
    <div class="q-px-xl q-py-md">
      <div class="column justify-center q-gutter-y-md">
        <q-list>
          <q-item
            class="q-pl-none"
            dense
          >
            <div class="text-grey-6 text-center">
              Products
            </div>
          </q-item>
          <q-separator color="greyscale-200" />
          <navigation-menu-item
            v-for="menuItem in menuItems"
            :key="menuItem.routeName"
            :menu-item="menuItem"
          />
        </q-list>
      </div>
    </div>
  </q-drawer>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { menuItems } from '@/components/TheNavigationPanel/menu';
import NavigationMenuItem from './NavigationMenuItem.vue';

const props = defineProps<{
    modelValue: boolean,
}>();
const emits = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
}>();

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value),
});

</script>

<style lang="scss">
.navigation-panel {
  .user-box {
    border-radius: 12px;
    padding: 16px 20px;
    //background-color: $color-grey-200;
  }

  &__logo {
    height: $toolbar-min-height;
    border-right: 1px solid #0000000A;
  }

  &__separator {
    background: #0000000A;
  }
}

</style>
