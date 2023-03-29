<template>
  <q-item
    v-if="!menuItem.items"
    :key="menuItem.routeName"
    :class="[
      'navigation-menu-item',
      {
        'navigation-menu-item--icon': menuItem.icon,
        'navigation-menu-item--without-icon': !menuItem.icon,
      }
    ]"
    :to="toComp"
    active-class="navigation-menu-item--active"
    :active="active"
    exact
    :data-test="`menu-item-${menuItem.routeName}`"
  >
    <q-item-section
      avatar
      class="align-center"
    >
      <div
        class="row justify-center items-center"
        style="width: 24px; height: 24px;"
      >
        <q-icon
          v-if="menuItem.icon"
          :name="menuItem.icon"
          size="24px"
        />
        <q-icon
          v-else
          name="circle"
          size="4px"
        />
      </div>
    </q-item-section>

    <q-item-section>
      {{ menuItem.label }}
    </q-item-section>
  </q-item>

  <q-expansion-item
    v-else
    :key="`${menuItem.routeName}-${menuItem.label ?? ''}`"
    :default-opened="active"
    class="navigation-menu-item"
    :header-class="[
      'navigation-menu-item',
      'navigation-menu-item--icon',
      {'navigation-menu-item--active': active}
    ]"
    :icon="menuItem.icon"
    :label="menuItem.label"
  >
    <navigation-menu-item
      v-for="subItem in menuItem.items"
      :key="subItem.routeName"
      :menu-item="subItem"
    />
  </q-expansion-item>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { INavigationMenuItem } from '@/components/TheNavigationPanel/menu';

const props = defineProps<{
    menuItem: INavigationMenuItem,
}>();
const route = useRoute();

const active = computed(
  () => route.matched.some(({ name }) => props.menuItem.routeName === name),
);

const toComp = computed(() => {
  return {
    name: props.menuItem.routeName,
    query: props.menuItem.query,
    params: {},
  };
});

</script>

<style lang="scss">
.navigation-menu-item {
  &.q-item, &.q-expansion-item {
    .q-icon {
      //color: $color-text-disabled;
    }

    .q-item__section {
      //color: $color-text-secondary;
    }
  }
}

.navigation-menu-item--icon {
  &.navigation-menu-item--active {
    background-color: rgba(224, 172, 133, 0.1);
    color: rgba(251,117,14,1.00);
    font-weight: bold;
    //color: $color-primary-3 !important;
    //font-size: map-get($subtitle2, 'size');
    //line-height: map-get($subtitle2, 'line-height');
    //letter-spacing: map-get($subtitle2, 'letter-spacing');
    //font-weight: map-get($subtitle2, 'weight');

    &:after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      width: 3px;
      //background-color: $color-primary-3;
      border-radius: 2px 0 0 2px;
    }

    .q-icon, .q-item__section {
      //color: $color-primary-3 !important;
    }
  }
}

.navigation-menu-item--without-icon {
  &.navigation-menu-item--active {
    .q-item__section {
      //color: $color-text-primary !important;
      //font-size: map-get($subtitle2, 'size');
      //line-height: map-get($subtitle2, 'line-height');
      //letter-spacing: map-get($subtitle2, 'letter-spacing');
      //font-weight: map-get($subtitle2, 'weight');

      .q-icon {
        //color: $color-primary-3 !important;
        font-size: 8px !important;
      }
    }
  }
}
</style>
