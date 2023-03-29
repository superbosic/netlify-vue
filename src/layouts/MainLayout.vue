<template>
  <q-layout
    v-if="!loading"
    view="hHh LpR fFf"
  >
    <the-header-panel />
    <the-navigation-panel
      v-model="leftDrawerOpen"
      style="z-index: 99999999;"
    />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
  <q-spinner
    v-else
    size="xl"
    color="primary"
    class="absolute-center"
  />
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import { createApiInstance } from '@/api';
import { Auth } from '@/api/Auth';
import { useAccountStore } from '@/store/account';
import useRequest from '@/composition/useRequest';
import TheHeaderPanel from '@/components/TheHeaderPanel.vue';
import TheNavigationPanel from '@/components/TheNavigationPanel/TheNavigationPanel.vue';

const { setUser } = useAccountStore();
const authApi = createApiInstance(Auth);
const leftDrawerOpen = ref(true);
const { sendRequest: loadAccountInfo, loading } = useRequest({
  request: () => authApi.getAuth().then((data) => data!.data!),
  successCallback: (account) => setUser(account),
});

onBeforeMount(loadAccountInfo);
</script>
