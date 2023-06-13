<template>
  <q-header
    class="header-panel bg-white text-black"
    bordered
  >
    <q-toolbar>
      <div class="text-bold">
        {{ currentMenuLabel }}
      </div>
      <q-space />
      <div class="row q-gutter-x-xs items-center">
        <q-btn
          flat
          padding="0"
        >
          <q-avatar>
            <img
              :src="userInfo?.profileImage"
              :alt="userInfo?.name"
            >
          </q-avatar>
          <q-popup-proxy>
            <q-list>
              <q-item>
                <q-item-section avatar>
                  <q-avatar icon="person" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-no-wrap">
                    {{ userInfo?.name }}
                  </q-item-label>
                  <q-item-label
                    caption
                  >
                    Name
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-popup-proxy>
        </q-btn>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts" setup>
import { useAccountStore } from '@/store/account';
import { useMenu } from '@/components/TheNavigationPanel/menu';

const { userInfo } = useAccountStore();
const { currentMenuLabel } = useMenu();
</script>
