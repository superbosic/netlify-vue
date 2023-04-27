<template>
  <q-uploader
    ref="uploaderRef"
    class="sign-now-upload-document rounded-borders overflow-hidden full-width full-height"
    color="transparent"
    accept="application/pdf"
    flat
    @added="uploadFile($event[0])"
  >
    <template #header>
      <div
        :style="{width: '100%'}"
        class="row items-center justify-center full-height"
      >
        <div class="column items-center">
          <div class="text-h5 text-black">
            Upload Contract
          </div>
          <q-icon
            name="cloud_upload"
            size="80px"
            color="grey-5"
          />
          <div class="text-black text-body1">
            Drag & drop files or <span class="text-orange-4">Browse</span>
          </div>
        </div>
        <q-uploader-add-trigger />
        <q-inner-loading
          :showing="loading"
          color="primary"
        />
      </div>
    </template>
  </q-uploader>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { QUploader } from 'quasar';
import { useRouter } from 'vue-router';
import { useAccountStore } from '@/store/account';
import { useSignNow } from '@/composition/useSignNow';
import useRequest from '@/composition/useRequest';
import { RouteNames } from '@/router/routeNames';

const accountStore = useAccountStore();
const router = useRouter();
const { upload } = useSignNow(accountStore.user.value!);
const uploaderRef = ref<QUploader | null>(null);
const { loading, sendRequest: uploadFile } = useRequest({
  request: (file: File) => upload(file),
  successCallback: ({ id }) => {
    console.log(id);
    router.push({ name: RouteNames.DocumentUpload, params: { id } });
  },
});

</script>
<style lang="scss">
.sign-now-upload-document {
  .q-uploader__header {
    height: 100%;
  }

  .q-uploader__list {
    display: none;
  }
}
</style>
