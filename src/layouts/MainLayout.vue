<template>
  <q-layout
    v-if="userInfo"
    view="lHh LpR fFf"
  >
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
import { ref } from 'vue';

const userInfo = ref(true);
</script>
