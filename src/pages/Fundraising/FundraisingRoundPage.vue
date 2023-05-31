<template>
  <div class="q-pa-md relative-position">
    <div v-if="round">
      <q-breadcrumbs
        separator=">"
      >
        <q-breadcrumbs-el
          label="Rounds"
          class="text-grey-7"
        />
        <q-breadcrumbs-el :label="name" />
      </q-breadcrumbs>
      <div class="q-mt-md">
        <div class="q-gutter-md">
          <div>
            <div class="row items-center q-gutter-md">
              <div class="text-h6">
                {{ name }}
              </div>
              <fundraising-round-status :status="round.status" />
              <q-space />
              <div class="row q-gutter-md">
                <q-btn
                  color="primary"
                  label="Edit this round"
                  flat
                  no-caps
                  :to="{name: RouteNames.FundraisingRoundEdit, params: { id }}"
                />
                <q-btn
                  color="negative"
                  label="Delete this round"
                  flat
                  no-caps
                  @click="deleteRoundClick"
                />
              </div>
            </div>
          </div>
          <div>
            <div class="row q-col-gutter-md">
              <div class="col-3">
                <ui-info-card
                  name="Total Supply (Round)"
                  :value="numberFormat(round.token_amount)"
                />
              </div>
              <div class="col-3">
                <ui-info-card
                  name="Price Per Token"
                  :value="currencyFormat(round.raise_usd)"
                />
              </div>
              <div class="col-4">
                <ui-info-card
                  name="Unlocking Schedule"
                >
                  <div
                    v-for="(scheme, index) in round.unlock_scheme"
                    :key="index"
                  >
                    {{ unlockSchemeToString(scheme as any) }}
                  </div>
                </ui-info-card>
              </div>
              <div class="col-2">
                <ui-info-card
                  name="Round Create Date"
                  :value="formatFromTimestamp(round.created_at, 'DD.MM.YYYY')"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="q-mt-md">
        <div class="row q-col-gutter-md">
          <div class="col-8">
            <q-card
              flat
              bordered
            >
              <q-card-section>
                <div class="row q-col-gutter-lg">
                  <div class="col-4">
                    <chart :options="chartOptions" />
                  </div>
                  <div class="col-8 row items-center">
                    <div class="row q-col-gutter-xl">
                      <div class="col-6">
                        <ui-chart-legend-item
                          color="primary"
                          name="Amount Raised"
                          :value="currencyFormat(round.raise_usd)"
                        />
                      </div>
                      <div class="col-6">
                        <ui-chart-legend-item
                          color="grey-8"
                          name="Pending"
                          :value="currencyFormat(round.token_amount)"
                        />
                      </div>
                      <div class="col-6">
                        <ui-chart-legend-item
                          color="grey-3"
                          name="Amount Remaining"
                          :value="currencyFormat(round.token_amount)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-4">
            <q-card
              flat
              bordered
              class="full-height"
            >
              <q-card-section class="full-height">
                <SignNowUploadDocument @document-uploaded="onDocumentUploaded" />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
      <div class="q-mt-md">
        <div class="row justify-end">
          <q-btn
            label="Add investor"
            icon="add"
            color="primary"
            flat
            no-caps
            @click="fundraisingInvestorCreateDialogIsOpen = true"
          />
        </div>
        <fundraising-investors-table :investors="round?.investors" />
        <fundraising-investor-create-dialog
          v-if="fundraisingInvestorCreateDialogIsOpen"
          v-model="fundraisingInvestorCreateDialogIsOpen"
          :round-id="round.id"
          @created="onRoundInvestorCreated"
        />
      </div>
    </div>
    <q-spinner
      v-else
      size="xl"
      color="primary"
      class="absolute-center"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { Chart } from 'highcharts-vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { createApiInstance } from '@/api/token';
import { Fundraising } from '@/api/token/Fundraising';
import useRequest from '@/composition/useRequest';
import FundraisingRoundStatus from '@/components/Fundraising/FundraisingRoundStatus.vue';
import UiInfoCard from '@/components/ui/UiInfoCard.vue';
import { useDateFormatters, useFormatNumber } from '@/composition/useFormatters';
import { useToken } from '@/composition/business/useToken';
import { RouteNames } from '@/router/routeNames';
import UiChartLegendItem from '@/components/ui/UiChartLegendItem.vue';
import FundraisingInvestorsTable from '@/components/Fundraising/FundraisingInvestorsTable.vue';
import SignNowUploadDocument from '@/components/SignNow/SignNowUploadDocument.vue';
import FundraisingInvestorCreateDialog from '@/components/Fundraising/FundraisingInvestorCreateDialog.vue';

const props = defineProps<{
    id: number,
}>();

const { dialog } = useQuasar();
const router = useRouter();
const { formatFromTimestamp } = useDateFormatters();
const { numberFormat, currencyFormat } = useFormatNumber();
const { unlockSchemeToString } = useToken();
const fundraisingApi = createApiInstance(Fundraising);
const { sendRequest: loadRound, responseData: round } = useRequest({
  request: () => fundraisingApi.roundList({ id: props.id }).then((data) => data!.data!.data!),
});
const { sendRequest: roundDelete } = useRequest({
  request: () => fundraisingApi.roundDelete({ id: props.id }).then((data) => data!.data!.data!),
  successCallback: () => router.replace({ name: RouteNames.Fundraising }),
});
const { sendRequest: roundDocumentCreate } = useRequest({
  request: (documentId: string) => fundraisingApi.roundDocumentCreate({
    id: round.value!.id!,
    signnow_document_id: documentId,
  }),
});
const fundraisingInvestorCreateDialogIsOpen = ref(false);
const name = computed(() => round.value?.name);
const chartOptions = computed(() => ({
  chart: {
    type: 'pie',
    height: '300px',
  },
  title: {
    text: '',
  },
  plotOptions: {
    groupPadding: 0,
    padding: 0,
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: false,
      },
    },
  },
  series: [
    {
      innerSize: '70%',
      data: [
        {
          name: 'Amount Raised',
          y: round.value?.raise_usd,
          color: '#22C55E',
        },
        {
          name: 'Amount Remaining',
          y: round.value?.token_amount,
          color: '#eeeeee',
        },
        {
          name: 'Pending',
          y: round.value?.token_percentage,
          color: '#616161',
        },
      ],
      color: '#6fcd98',
    },
  ],
  credits: {
    enabled: false,
  },
}));

function deleteRoundClick() {
  dialog({
    title: `Delete ${round.value?.name} round?`,
    cancel: true,
  }).onOk(roundDelete);
}

function onRoundInvestorCreated() {
  fundraisingInvestorCreateDialogIsOpen.value = false;
  loadRound();
}

async function onDocumentUploaded(id: string) {
  await roundDocumentCreate(id);
  router.push({ name: RouteNames.DocumentUpload, params: { id } });
}

loadRound();
</script>
