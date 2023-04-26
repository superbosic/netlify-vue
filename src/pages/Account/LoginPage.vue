<template>
  <q-card class="col-12 col-md-6">
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
          color="primary"
          type="submit"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useValidationRules } from '@/composition/useValidationRules';
import router from '@/router';
import { urlParamsToObject } from '@/utils';
import { useAccountStore } from '@/store/account';
import { createApiInstance } from '@/api';
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
</script>
