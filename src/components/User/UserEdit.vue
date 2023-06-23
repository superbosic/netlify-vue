<template>
  <q-form
    ref="refForm"
    greedy
    @submit="userCreate"
  >
    <q-card-section style="width: 300px">
      <div class="text-center text-h4 text-grey-9">
        Edit profile
      </div>
    </q-card-section>
    <q-card-section>
      <div class="column q-gutter-xl">
        <q-input
          v-model="userInput.name"
          outlined
          label="Name"
          :rules="defaultRequiredRules"
        />
        <q-input
          v-model="userInput.email"
          outlined
          label="Email"
          :rules="defaultRequiredRules"
        />
      </div>
    </q-card-section>
  </q-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { QForm } from 'quasar';
import { createApiInstance } from '@/api/token';
import { useValidationRules } from '@/composition/useValidationRules';
import useRequest from '@/composition/useRequest';
import { useAccountStore } from '@/store/account';
import { User } from '@/api/token/User';
import { UserInput } from '@/types/user';

const props = defineProps<{
  showActions?: boolean,
}>();
const emits = defineEmits<{
  (e: 'changed'):void,
}>();

const { user, setUser } = useAccountStore();
const userApi = createApiInstance(User);
const { defaultRequiredRules, numberRequiredRule } = useValidationRules();
const refForm = ref<QForm | null>(null);
const userInput = ref<UserInput>({
  name: user.value?.name ?? '',
  email: user.value?.email ?? '',
});
const { loading, sendRequest: userCreate } = useRequest({
  request: () => userApi.userCreate(userInput.value).then((data) => data!.data!.data!),
  successCallback: (value) => {
    setUser(value);
    emits('changed');
  },
});

async function submit() {
  const isValid = await refForm.value?.validate();

  if (isValid) {
    refForm.value?.submit();
  }

  return isValid;
}

defineExpose({
  submit,
});
</script>
