<template>
  <div class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col-7">
        <q-card
          flat
          bordered
        >
          <q-card-section>
            <div class="row">
              <div class="text-h5">
                Personal Details
              </div>
              <q-space />
              <q-btn
                label="Edit"
                icon="o_edit"
                no-caps
                outline
                @click="userEditDialogIsOpen = true"
              />
            </div>
          </q-card-section>
          <q-card-section>
            <q-list v-if="user">
              <ui-icon-field-info
                icon-name="o_person"
                name="Name"
                :value="user.name!"
              />
              <!--              <ui-icon-field-info
                icon-name="o_account_balance_wallet"
                name="Wallet address"
                :value="user.Web3AuthWalletAddress"
              />-->
              <ui-icon-field-info
                icon-name="o_mail"
                name="Email"
                :value="user.email!"
              />
            </q-list>
          </q-card-section>
        </q-card>

        <ui-right-dialog
          v-model="userEditDialogIsOpen"
          :loading="userEditLoading"
          @apply="userEditApply"
        >
          <user-edit
            ref="userEditRef"
            @changed="onUserEdited"
          />
        </ui-right-dialog>
      </div>
      <div class="col-5">
        <q-card
          flat
          bordered
        >
          <q-card-section>
            <div class="row">
              <div class="text-h5">
                Project Details
              </div>
              <q-space />
              <q-btn
                label="Edit"
                icon="o_edit"
                no-caps
                outline
                @click="projectEditDialogIsOpen = true"
              />
            </div>
          </q-card-section>
          <q-card-section>
            <q-list
              v-if="project"
              dense
            >
              <q-item>
                <q-item-section no-wrap>
                  <ui-field-info
                    name="Project Name"
                    :value="project.name"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section no-wrap>
                  <ui-field-info
                    name="Max Token Supply"
                    :value="project.max_token_supply"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section no-wrap>
                  <ui-field-info
                    name="Token Ticker"
                    :value="project.token_ticker"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section no-wrap>
                  <ui-field-info
                    name="Token Network"
                    :value="project.token_network"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>

        <ui-right-dialog
          v-model="projectEditDialogIsOpen"
          :loading="projectEditLoading"
          @apply="projectEditApply"
        >
          <project-edit
            ref="projectEditRef"
            @changed="onProjectEdited"
          />
        </ui-right-dialog>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useAccountStore } from '@/store/account';
import UiIconFieldInfo from '@/components/ui/UiIconFieldInfo.vue';
import { useProjectStore } from '@/store/project';
import UiFieldInfo from '@/components/ui/UiFieldInfo.vue';
import ProjectEdit from '@/components/Project/ProjectEdit.vue';
import UiRightDialog from '@/components/ui/UiRightDialog.vue';
import UserEdit from '@/components/User/UserEdit.vue';

const { user } = useAccountStore();
const { project } = useProjectStore();

const userEditDialogIsOpen = ref(false);
const projectEditDialogIsOpen = ref(false);
const projectEditLoading = ref(false);
const userEditLoading = ref(false);
const projectEditRef = ref<InstanceType<typeof ProjectEdit> | null>(null);
const userEditRef = ref<InstanceType<typeof UserEdit> | null>(null);

async function projectEditApply() {
  if (await projectEditRef.value?.submit()) {
    projectEditLoading.value = true;
  }
}

function onProjectEdited() {
  projectEditLoading.value = false;
  projectEditDialogIsOpen.value = false;
}
async function userEditApply() {
  if (await userEditRef.value?.submit()) {
    userEditLoading.value = true;
  }
}

function onUserEdited() {
  userEditLoading.value = false;
  userEditDialogIsOpen.value = false;
}
</script>
