<template>
  <q-layout
    v-if="account && project"
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
import { useRouter } from 'vue-router';
import { createApiInstance } from '@/api';
import { Auth } from '@/api/Auth';
import { useAccountStore } from '@/store/account';
import useRequest from '@/composition/useRequest';
import TheHeaderPanel from '@/components/TheHeaderPanel.vue';
import TheNavigationPanel from '@/components/TheNavigationPanel/TheNavigationPanel.vue';
import { Project } from '@/api/Project';
import { RouteNames } from '@/router/routeNames';
import { useProjectStore } from '@/store/project';

const { setUser } = useAccountStore();
const { setProject } = useProjectStore();
const authApi = createApiInstance(Auth);
const projectApi = createApiInstance(Project);
const leftDrawerOpen = ref(true);
const router = useRouter();

const { sendRequest: projectList, responseData: project } = useRequest({
  request: () => projectApi.projectList().then((data) => data!.data!.data),
  successCallback: (value) => {
    if (!value) {
      router.replace({ name: RouteNames.ProjectEdit });
    } else {
      setProject(value);
    }
  },
});
const { sendRequest: loadAccountInfo, responseData: account } = useRequest({
  request: () => authApi.getAuth().then((data) => data!.data!),
  successCallback: (value) => {
    setUser(value);
    projectList();
  },
});

onBeforeMount(loadAccountInfo);
</script>
