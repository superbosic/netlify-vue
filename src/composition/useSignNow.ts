import { LocalStorage } from 'quasar';
import { IUser } from '@/store/account';
import { BearerTokenKey, uploadDocument, generateAccessToken } from '@/api/SignNow';

export function useSignNow(user: IUser) {
  async function upload(file: Blob) {
    if (!LocalStorage.getItem(BearerTokenKey)) {
      await generateAccessToken();
    }

    return uploadDocument(file);
  }

  return {
    upload,
  };
}
