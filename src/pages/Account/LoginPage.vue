<template>
  <q-card
    class="col-12 col-md-6"
    flat
    bordered
  >
    <q-form @submit="logIn">
      <q-card-section class="column q-col-gutter-md">
        <div class="text-h5">
          Authorize
        </div>
        <q-input
          v-model="email"
          label="Login"
          :rules="defaultRequiredRules"
          name="login"
          outlined
          autofocus
        />
        <q-input
          v-model="password"
          label="Password"
          :rules="defaultRequiredRules"
          name="password"
          type="password"
          outlined
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          label="Login"
          :loading="loading"
          no-caps
          unelevated
          color="primary"
          type="submit"
        />
        <q-btn
          label="web3oauth"
          no-caps
          unelevated
          color="primary"
          @click="web"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Web3Auth } from '@web3auth/modal';
import { useValidationRules } from '@/composition/useValidationRules';
import router from '@/router';
import { urlParamsToObject } from '@/utils';
import { useAccountStore } from '@/store/account';
import { createApiInstance } from '@/api/token';
import { Auth } from '@/api/token/Auth';
import useRequest from '@/composition/useRequest';

const email = ref('');
const password = ref('');
const { defaultRequiredRules } = useValidationRules();
const accountStore = useAccountStore();
const authApi = createApiInstance(Auth);
const { sendRequest: logIn, loading } = useRequest({
  request: () => authApi.loginCreate({
    email: email.value,
    password: password.value,
  }).then((data) => data.data),
  successCallback: async ({ authToken }) => {
    accountStore.setToken(authToken!);
    const [
      path,
      query,
    ] = (router.currentRoute.value.query.redirect as string || '/').split('?');

    await router.replace({
      path,
      query: urlParamsToObject(query),
    });
  },
});
const { loading: web3LoginCreateLoading, sendRequest: web3LoginCreate } = useRequest({
  request: ({ JWT, Method }: { JWT: string, Method: string }) => authApi.web3LoginCreate({
    JWT,
    Method,
  }).then((data) => data.data),
  successCallback: async ({ authToken }) => {
    accountStore.setToken(authToken!);
    const [
      path,
      query,
    ] = (router.currentRoute.value.query.redirect as string || '/').split('?');

    await router.replace({
      path,
      query: urlParamsToObject(query),
    });
  },
});

async function web() {
  const web3auth = new Web3Auth({
    clientId: import.meta.env.VITE_WEB3OAUTH_CLIENT_ID, // Get your Client ID from Web3Auth Dashboard
    chainConfig: {
      chainNamespace: 'eip155',
      chainId: '0x1',
    },
  });

  await web3auth.initModal();
  await web3auth.connect();

  const user = await web3auth.getUserInfo();
  let { idToken } = user;

  if (!idToken) {
    const authUser = await web3auth.authenticateUser();

    idToken = authUser.idToken;
  }

  await web3LoginCreate({ JWT: idToken, Method: web3auth.connectedAdapterName! });
}
</script>
