<template>
  <q-drawer
    v-model="isOpen"
    show-if-above
    side="left"
    bordered
    class="navigation-panel q-pt-md"
  >
    <div class="column justify-center q-gutter-y-md">
      <q-list>
        <q-item>
          <div class="text-grey-6 text-uppercase text-bold text-center">
            Products
          </div>
        </q-item>
        <navigation-menu-item
          v-for="menuItem in menuItems"
          :key="menuItem.routeName"
          :menu-item="menuItem"
        />
      </q-list>
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
}

</style>
