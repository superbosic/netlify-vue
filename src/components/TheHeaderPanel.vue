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
import { Web3Auth } from '@web3auth/modal';
import { useAccountStore } from '@/store/account';
import { RouteNames } from '@/router/routeNames';

const { user, logout } = useAccountStore();
const router = useRouter();

async function logoutClick() {
  const web3auth = new Web3Auth({
    clientId: import.meta.env.VITE_WEB3OAUTH_CLIENT_ID, // Get your Client ID from Web3Auth Dashboard
    chainConfig: {
      chainNamespace: 'eip155',
      chainId: '0x1',
    },
  });

  await web3auth.initModal();
  await web3auth.connect();
  await web3auth.logout();

  logout();

  router.replace({
    name: RouteNames.AccountLogin,
    query: { redirect: router.currentRoute.value.fullPath },
  });
}
</script>
