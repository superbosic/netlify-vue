<template>
  <div
    class="q-pt-sm"
    style="height: calc(100vh - 60px)"
  >
    <iframe
      v-if="link"
      :src="link"
    />
    <q-inner-loading
      :showing="loading"
      color="primary"
    />
  </div>
</template>

<script lang="ts" setup>
import { createSignNowApiInstance } from '@/api';
import { V2 } from '@/api/singNow/V2';
import useRequest from '@/composition/useRequest';

const props = defineProps<{
    id: string;
}>();
const signNowV2Api = createSignNowApiInstance(V2);
const { loading, sendRequest: urlV2DocumentsDocumentIdEmbeddedEditor, responseData: link } = useRequest({
  request: () => signNowV2Api.urlV2DocumentsDocumentIdEmbeddedEditor(props.id, {
    redirect_uri: 'https://ya.ru',
  }).then((res) => res.json()).then(({ data }) => data.url),
});

urlV2DocumentsDocumentIdEmbeddedEditor();
</script>
