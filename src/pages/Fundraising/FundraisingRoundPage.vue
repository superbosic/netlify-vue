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
              <q-btn
                color="warning"
                label="Delete this round"
                flat
                no-caps
                @click="deleteRoundClick"
              />
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
                    {{ unlockSchemeToString(scheme) }}
                  </div>
                </ui-info-card>
              </div>
              <div class="col-2">
                <ui-info-card
                  name="Round Create Date"
                  :value="formatFromTimestamp(round.create_at, 'DD.MM.YYYY')"
                />
              </div>
            </div>
          </div>
        </div>
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
import { computed } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { createApiInstance } from '@/api';
import { Fundraising } from '@/api/Fundraising';
import useRequest from '@/composition/useRequest';
import FundraisingRoundStatus from '@/components/Fundraising/FundraisingRoundStatus.vue';
import UiInfoCard from '@/components/ui/UiInfoCard.vue';
import { useDateFormatters, useFormatNumber } from '@/composition/useFormatters';
import { useToken } from '@/composition/business/useToken';
import { RouteNames } from '@/router/routeNames';

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
const name = computed(() => round.value?.name);

function deleteRoundClick() {
  dialog({
    title: `Delete ${round.value?.name} round?`,
    cancel: true,
  }).onOk(roundDelete);
}

loadRound();
</script>
