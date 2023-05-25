<template>
  <q-header
    class="header-panel bg-white text-black"
  >
    <q-toolbar>
      <q-space />
      <div class="row q-gutter-x-xs items-center">
        <div>
          {{ (user as any)?.name }}
        </div>
        <q-btn
          padding="0"
          flat
          rounded
          disable-dropdown
          @click="logoutClick"
        >
          <q-avatar size="40px">
            <q-icon
              name="logout"
              size="sm"
              color="color-text-secondary"
            />
          </q-avatar>
        </q-btn>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useAccountStore } from '@/store/account';
import { RouteNames } from '@/router/routeNames';

const { user, logout } = useAccountStore();
const router = useRouter();

function logoutClick() {
  logout();
  router.replace({
    name: RouteNames.AccountLogin,
    query: { redirect: router.currentRoute.value.fullPath },
  });
}
</script>
