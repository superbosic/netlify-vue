<template>
  <div class="q-pa-md">
    <div class="row justify-center">
      <div class="col-6">
        <project-edit
          show-actions
          @changed="router.push({ name: RouteNames.Dashboard })"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { RouteNames } from '@/router/routeNames';
import ProjectEdit from '@/components/Project/ProjectEdit.vue';

const router = useRouter();

</script>
