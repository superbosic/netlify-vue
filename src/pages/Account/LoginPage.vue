<template>
  <q-spinner
    v-if="loading"
    size="xl"
    class="absolute-center"
    color="primary"
  />
</template>

<script lang="ts" setup>
import { useAccountStore } from '@/store/account';
import useRequest from '@/composition/useRequest';
import router from '@/router';
import { urlParamsToObject } from '@/utils';

const { login } = useAccountStore();
const { loading, sendRequest: loginUser } = useRequest({
  request: () => login(),
  successCallback: async () => {
    const [
      path,
      query,
    ] = (router.currentRoute.value.query.redirect as string || '/').split('?');

    setTimeout(() => {
      router.replace({
        path,
        query: urlParamsToObject(query),
      });
    }, 1000);
  },
});

loginUser();
</script>
