<template>
  <q-card class="col-12 col-md-6">
    <q-form @submit="logIn">
      <q-card-section class="column q-col-gutter-md">
        <div class="text-h5">
          Авторизация
        </div>
        <q-input
          v-model="email"
          label="Логин"
          :rules="defaultRequiredRules"
          name="login"
          outlined
          autofocus
        />
        <q-input
          v-model="password"
          label="Пароль"
          :rules="defaultRequiredRules"
          name="password"
          type="password"
          outlined
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          label="Войти"
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
// import { useAccountStore } from '@/store/account';
import { urlParamsToObject } from '@/utils';

const email = ref('');
const password = ref('');
const loading = ref(false);
const { defaultRequiredRules } = useValidationRules();
// const accountStore = useAccountStore();

async function logIn() {
  const [
    path,
    query,
  ] = (router.currentRoute.value.query.redirect as string || '/').split('?');

  await router.replace({
    path,
    query: urlParamsToObject(query),
  });
}
</script>
