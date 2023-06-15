<template>
  <q-drawer
    v-model="isOpen"
    show-if-above
    side="left"
    class="navigation-panel"
    bordered
  >
    <div class="column full-height">
      <div>
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
      </div>
      <q-space />
      <div class="q-px-xl q-pb-lg">
        <navigation-menu-item
          :menu-item="menuItemSettings"
        />
        <navigation-menu-item
          class="cursor-pointer"
          :menu-item="menuItemLogout"
          @click.capture="logoutClick"
        />
      </div>
    </div>
    <q-inner-loading
      :showing="logoutUserLoading"
      color="primary"
    />
  </q-drawer>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { INavigationMenuItem, useMenu } from '@/components/TheNavigationPanel/menu';
import NavigationMenuItem from './NavigationMenuItem.vue';
import useRequest from '@/composition/useRequest';
import { RouteNames } from '@/router/routeNames';
import { useAccountStore } from '@/store/account';

const props = defineProps<{
    modelValue: boolean,
}>();
const emits = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
}>();

const { menuItems } = useMenu();
const { logout } = useAccountStore();
const router = useRouter();
const { dialog } = useQuasar();

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value),
});

const { loading: logoutUserLoading, sendRequest: logoutUser } = useRequest({
  request: () => logout(),
  successCallback: () => router.replace({
    name: RouteNames.AccountLogin,
    query: { redirect: router.currentRoute.value.fullPath },
  }),
});

const menuItemSettings:INavigationMenuItem = {
  label: 'Settings',
  routeName: RouteNames.Settings,
  icon: 'o_settings',
};

const menuItemLogout:INavigationMenuItem = {
  label: 'Logout',
  icon: 'o_logout',
};

function logoutClick() {
  dialog({
    title: 'Log Out',
    message: 'Are you sure you want to logout? You will be returned to the login page.',
    persistent: true,
    cancel: true,
  }).onOk(logoutUser);
}

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
