<template>
  <div class="q-pa-md">
    <div class="text-h5 q-mb-md text-grey-7">
      Rounds
    </div>
    <div class="row q-col-gutter-md">
      <div
        v-for="round in fundraisings?.fundraising_rounds"
        :key="round.id"
        class="col-6"
      >
        <q-card
          flat
          bordered
        >
          <q-card-section>
            <div class="row">
              <q-icon
                name="list_alt"
                color="grey-6"
                size="xl"
              />
              <div class="col q-ml-md">
                <div class="text-bold">
                  {{ round.name }}
                </div>
                <div class="text-caption text-grey-7">
                  Created on: {{ formatFromTimestamp(round.created_at) }}
                </div>
                <div class="q-mt-md">
                  <div class="row q-gutter-xl">
                    <div>
                      <div class="row">
                        <div class="text-caption text-grey-7">
                          Raising:
                        </div>
                        <div class="q-ml-xs text-caption">
                          {{ currencyFormat(round.token_amount) }}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="row">
                        <div class="text-caption text-grey-7">
                          Unlock schedule:
                        </div>
                        <div class="q-ml-xs text-caption">
                          <div
                            v-for="scheme in round.unlock_scheme"
                            :key="scheme.id"
                          >
                            {{ unlockSchemeToString(scheme) }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <fundraising-round-status :status="round.status" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { createApiInstance } from '@/api';
import { Fundraising } from '@/api/Fundraising';
import useRequest from '@/composition/useRequest';
import { useDateFormatters, useFormatNumber } from '@/composition/useFormatters';
import { useToken } from '@/composition/business/useToken';
import FundraisingRoundStatus from '@/components/Fundraising/FundraisingRoundStatus.vue';

const fundraisingApi = createApiInstance(Fundraising);

const { formatFromTimestamp } = useDateFormatters();
const { currencyFormat } = useFormatNumber();
const { unlockSchemeToString } = useToken();
const { loading, sendRequest: fundraisingList, responseData: fundraisings } = useRequest({
  request: () => fundraisingApi.fundraisingList().then((data) => data!.data!.data!),
});

fundraisingList();
</script>
