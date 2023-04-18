<template>
  <div class="q-pa-md">
    <div
      class="q-gutter-y-md"
    >
      <q-card
        flat
        bordered
      >
        <q-tabs>
          <q-route-tab
            label="Token Allocation"
            :to="{ name: RouteNames.TokenTableTokenAllocation }"
            exact
            no-caps
          />
          <q-route-tab
            label="Unlock Tokens"
            :to="{ name: RouteNames.TokenTableUnlockTokens }"
            exact
            no-caps
          />
        </q-tabs>
        <q-separator />
        <q-card-section>
          <router-view />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script setup lang="ts">
import { RouteNames } from '@/router/routeNames';

</script>
