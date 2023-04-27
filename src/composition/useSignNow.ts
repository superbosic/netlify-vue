import { LocalStorage } from 'quasar';
import { computed, onMounted } from 'vue';
import { IUser } from '@/store/account';
import { BearerTokenKey, createSignNowApiInstance } from '@/api';
import { Oauth2 } from '@/api/singNow/Oauth2';
import { Document } from '@/api/singNow/Document';
import { useProjectStore } from '@/store/project';
import { User } from '@/api/singNow/User';
import useRequest from '@/composition/useRequest';
import { Folder } from '@/api/singNow/Folder';

const BasicToken = 'ZDVlMTkzMzZmYmM0ZmY4YzgxY2UyZWMyOTczZTM4YTU6MDZkNTQ5M2IxNDI4ZDk5MTQyY2EzM2FhYmZlOTA1NjY=';
const username = 'bagfaq.innocode@gmail.com';
const password = 'w52S5nPHSJciEP4#';

export function useSignNow(user: IUser) {
  const signNowOauth2Api = createSignNowApiInstance(Oauth2);
  const signNowDocumentApi = createSignNowApiInstance(Document);
  const signNowUserApi = createSignNowApiInstance(User);
  const signNowUFolderApi = createSignNowApiInstance(Folder);
  const { project } = useProjectStore();
  const { sendRequest: getAllFolders, responseData: folders } = useRequest({
    request: () => signNowUserApi.getAllFolders()
      .then((res) => res.json())
      .then((res) => res.folders),
  });
  const { sendRequest: generateAccessToken } = useRequest({
    request: () => signNowOauth2Api.generateAccessToken({
      username,
      password,
      grant_type: 'password',
      expiration_time: '10000000',
    }, {
      headers: {
        Authorization: `Basic ${BasicToken}`,
      },
    }).then((result) => result.json()),
    successCallback: ({ access_token }) => LocalStorage.set(BearerTokenKey, access_token),
  });
  const documentsFolderId = computed(() => folders.value?.find(({ name }: { name: string; }) => name === 'Documents')?.id);
  const projectFolderId = computed(() => folders.value?.find(({ name }: { name: string; }) => name === project.value?.name)?.id);
  const { sendRequest: createFolder } = useRequest({
    request: () => signNowUserApi.creaateFolder({
      name: project.value!.name,
      parent_id: documentsFolderId.value,
    }),
  });
  const { sendRequest: moveDocument } = useRequest({
    request: (documentId: string) => signNowDocumentApi.moveDocument(documentId, {
      folder_id: projectFolderId.value,
    }),
  });

  async function upload(file: File) {
    if (!LocalStorage.getItem(BearerTokenKey)) {
      await generateAccessToken();
    }

    // await signNowUFolderApi.getFolderById(documentsFolderId.value);

    // if (!projectFolderId.value) {
    //   await createFolder();
    // }

    return signNowDocumentApi.uploadDocument1({ file }).then((res) => res.json());
  }

  // onMounted(getAllFolders);

  // async function upload(file: Blob) {
  //   console.log(await getAllFolders());
  //
  //   return;
  //
  //   if (!LocalStorage.getItem(BearerTokenKey)) {
  //     await generateAccessToken();
  //   }
  //
  //   return uploadDocument(file);
  // }

  return {
    upload,
  };
}
