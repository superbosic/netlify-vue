<template>
  <router-view />
</template>

<script setup lang="ts">
fetch('https://realistic-factor-gw.aws-usw2.cloud-ara.tyk.io/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'string',
  }),
});
</script>
