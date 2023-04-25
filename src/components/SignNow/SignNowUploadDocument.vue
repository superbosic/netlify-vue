<template>
  <q-uploader
    ref="uploaderRef"
    class="upload-image rounded-borders overflow-hidden"
    flat
    @added="onFilesAdded"
  />
</template>

<script lang="ts" setup>
import { useAccountStore } from '@/store/account';
import { useSignNow } from '@/composition/useSignNow';

const accountStore = useAccountStore();
const { upload } = useSignNow(accountStore.user.value!);

function onFilesAdded(files: readonly File[]) {
  upload(files[0]);
}

</script>
