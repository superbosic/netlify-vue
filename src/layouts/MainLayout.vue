<template>
  <q-layout
    v-if="!loading"
    view="lHh LpR fFf"
  >
    <the-header-panel />
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
import { onBeforeMount } from 'vue';
import { createApiInstance } from '@/api';
import { Auth } from '@/api/Auth';
import { useAccountStore } from '@/store/account';
import useRequest from '@/composition/useRequest';
import TheHeaderPanel from '@/components/TheHeaderPanel.vue';

const { setUser } = useAccountStore();
const authApi = createApiInstance(Auth);
const { sendRequest: loadAccountInfo, loading } = useRequest({
  request: () => authApi.getAuth().then((data) => data!.data!),
  successCallback: (account) => setUser(account),
});

onBeforeMount(loadAccountInfo);
</script>
