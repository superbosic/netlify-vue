<template>
  <div class="q-pa-md">
    <div class="row items-center">
      Dashboard
      <q-btn
        :to="{name: RouteNames.ProjectEdit}"
        color="primary"
        label="Edit project"
        flat
        outline
        no-caps
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RouteNames } from '@/router/routeNames';
</script>
