<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page
        class="column full-height q-px-md"
        style="height: 1px;"
      >
        <div class="col row items-center justify-center">
          <router-view />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
