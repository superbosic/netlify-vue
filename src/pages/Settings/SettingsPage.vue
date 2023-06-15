<template>
  <div class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col-7">
        <q-card
          flat
          bordered
        >
          <q-card-section>
            <div class="text-h5">
              Personal Details
            </div>
          </q-card-section>
          <q-card-section>
            <q-list v-if="userInfo">
              <ui-icon-field-info
                icon-name="o_person"
                name="Name"
                :value="userInfo.name!"
              />
              <ui-icon-field-info
                icon-name="o_account_balance_wallet"
                name="Wallet address"
                value="0xB47cc31b9353Ce704511C2e751cC611B19301815"
              />
              <ui-icon-field-info
                icon-name="o_mail"
                name="Email"
                :value="userInfo.email!"
              />
            </q-list>
          </q-card-section>
        </q-card>
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
                <q-item-section>
                  <ui-field-info
                    name="Project Name"
                    :value="project.name"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <ui-field-info
                    name="Legal Entity Name"
                    value="None"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <ui-field-info
                    name="Project Description"
                    value="None"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <ui-field-info
                    name="Company Website"
                    value="None"
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

const { userInfo } = useAccountStore();
const { project } = useProjectStore();

const projectEditDialogIsOpen = ref(false);
const projectEditLoading = ref(false);
const projectEditRef = ref<InstanceType<typeof ProjectEdit> | null>(null);

function projectEditApply() {
  projectEditLoading.value = true;
  projectEditRef.value?.projectCreate();
}

function onProjectEdited() {
  projectEditLoading.value = false;
  projectEditDialogIsOpen.value = false;
}
</script>
