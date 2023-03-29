import { ref } from 'vue';
import { Notify } from 'quasar';

interface IRequestProps<T, P> {
  request: (params: P) => Promise<T>;
  successMessage?: string;
  successCallback?: (value: T, params?: P) => unknown;
  errorCallback?: (value: unknown) => unknown;
}

export enum Errors {
  ABORT = 'AbortError'
}

export default function useRequest<T, P>(props: IRequestProps<T, P>) {
  function notify() {
    Notify.create({
      message: props.successMessage,
      type: 'positive',
      html: true,
      position: 'top',
    });
  }

  const loading = ref(false);
  const responseData = ref<T>();

  async function sendRequest<Params extends(unknown extends P ? [] : [P])>(...[params]: Params) {
    let request;

    try {
      loading.value = true;
      request = props.request(params as P);
      const response = await request;

      responseData.value = response;

      const { successCallback, successMessage } = props;

      if (successCallback) {
        successCallback(response, params);
      }
      if (successMessage) {
        notify();
      }

      loading.value = false;
    } catch (e: unknown) {
      if ((e as Error)?.name !== Errors.ABORT) {
        Notify.create({
          message: (e as Error).message,
          type: 'negative',
          html: true,
          position: 'top',
        });

        loading.value = false;
      }

      if (props.errorCallback) {
        props.errorCallback(e);
      }
    }
  }

  return {
    responseData,
    loading,
    sendRequest,
  };
}
