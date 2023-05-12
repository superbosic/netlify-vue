<template>
  <div class="q-pa-md">
    <div class="q-gutter-md">
      <q-card
        v-for="task in tasks || []"
        :key="task.id"
        flat
        bordered
      >
        <q-card-section>
          <q-table
            :columns="columns"
            :rows="task.fundraising_rounds"
            :pagination="{ rowsPerPage: 0 }"
            hide-pagination
            flat
          >
            <template #body-cell-projectName>
              <q-td>
                {{ task.name }}
              </q-td>
            </template>
            <template #body-cell-allocation="{ row }">
              <q-td class="text-right">
                {{ currencyFormat(row.investor.investment_allocation) }}
              </q-td>
            </template>
            <template #body-cell-tokenPrice="{ row }">
              <q-td class="text-right">
                {{ currencyFormat(row.token_price_usd) }}
              </q-td>
            </template>
            <template #body-cell-unlock_scheme="{ row }">
              <q-td class="text-right">
                {{ unlockSchemeToString(row.unlock_scheme) }}
              </q-td>
            </template>
            <template #body-cell-action="{ row }">
              <q-td class="text-right">
                <q-btn
                  color="primary"
                  no-caps
                  label="Sign"
                  :loading="createInviteLinkLoading"
                  @click="createInviteLink(row)"
                />
              </q-td>
            </template>
          </q-table>
        </q-card-section>
        <!--        <q-card-section>
          <div class="row">
            <div class="col-auto">
              <q-card
                flat
                bordered
              >
                <q-card-section>
                  <div class="row q-gutter-md">
                    <div class="q-pa-xs bg-grey-5 rounded-borders">
                      <q-icon
                        name="format_list_bulleted"
                        color="white"
                        size="lg"
                      />
                    </div>
                    <div>
                      <div class="text-bold text-body2">
                        Contract.pdf
                      </div>
                      <div class="text-caption text-grey-6">
                        Created on: {{ formatFromTimestamp(Date.now()) }}
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-card-section>-->
      </q-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { QTableProps } from 'quasar';
import { useFormatNumber } from '@/composition/useFormatters';
import { createApiInstance, createSignNowApiInstance } from '@/api/token';
import { Document } from '@/api/singNow/Document';
import { Tasks } from '@/api/token/Tasks';
import useRequest from '@/composition/useRequest';
import { useToken } from '@/composition/business/useToken';
import { TasksListItemFundraisingRound } from '@/types/task';
import { V2 } from '@/api/singNow/V2';

const tasksApi = createApiInstance(Tasks);
const signNowDocumentApi = createSignNowApiInstance(Document);
const signNowV2Api = createSignNowApiInstance(V2);
const { currencyFormat } = useFormatNumber();
const { unlockSchemeToString } = useToken();
const { loading, sendRequest: tasksList, responseData: tasks } = useRequest({
  request: () => tasksApi.tasksList().then((data) => data.data.data),
});
const { loading: createInviteLinkLoading, sendRequest: createInviteLink } = useRequest({
  request: async (row: TasksListItemFundraisingRound) => {
    const { roles: [{ unique_id }], field_invites } = await signNowDocumentApi.getDocument(row.signnow_documet_id!).then((res) => res.json());
    let field_invite_id;

    if (field_invites.length === 0) {
      const [{ id }] = await signNowV2Api.urlV2DocumentsDocumentIdEmbeddedEditor2(row.signnow_documet_id!, {
        name_formula: 'any_text_prefix',
        invites: [
          {
            email: row.investor?.email,
            role_id: unique_id,
            order: 1,
            auth_method: 'none',
          },
        ],
      }).then((res) => res.json());

      field_invite_id = id;
    } else {
      field_invite_id = field_invites[0].id;
    }

    const { data: { link } } = await signNowV2Api.urlV2DocumentsDocumentIdEmbeddedInvitesFieldInviteIdLink(row.signnow_documet_id!, field_invite_id!, {
      link_expiration: 15,
      auth_method: 'none',
    }).then((res) => res.json());

    window.open(link, '_blank');
  },
});
const columns:QTableProps['columns'] = [
  {
    label: 'Project',
    name: 'projectName',
    field: 'projectName',
  },
  {
    label: 'Allocation',
    name: 'allocation',
    field: 'allocation',
  },
  {
    label: 'Token Price',
    name: 'tokenPrice',
    field: 'tokenPrice',
  },
  {
    label: 'Unlocking Schedule',
    name: 'unlock_scheme',
    field: 'unlock_scheme',
  },
  {
    label: 'Status',
    name: 'status',
    field: 'status',
  },
  {
    label: 'Action',
    name: 'action',
    field: 'action',
  },
];

tasksList();
</script>
