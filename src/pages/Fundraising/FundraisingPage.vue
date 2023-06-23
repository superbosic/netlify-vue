<template>
  <div class="q-pa-md relative-position">
    <div
      v-if="fundraisings"
      class="column q-gutter-lg"
    >
      <div>
        <div class="text-h5 q-mb-md text-grey-7">
          Summary
        </div>

        <div class="row q-col-gutter-md">
          <div class="col-4">
            <ui-info-card
              name="Total Supply"
              :value="numberFormat(totalSupply)"
            />
          </div>
          <div class="col-4">
            <ui-info-card
              name="Total raised"
              :value="currencyFormat(totalRaised)"
            />
          </div>
          <div class="col-2">
            <ui-info-card
              name="Founding rounds"
              :value="foundingRounds"
            />
          </div>
          <div class="col-2">
            <ui-info-card
              name="Stakeholders"
              :value="numberFormat(stakeholders)"
            />
          </div>
        </div>
      </div>

      <div>
        <div class="row text-h5 q-mb-md text-grey-7">
          <div>Rounds</div>
          <q-space />
          <q-btn
            no-caps
            color="primary"
            label="Create new round"
            unelevated
            :to="{ name: RouteNames.FundraisingRoundCreate }"
          />
        </div>

        <div class="row q-col-gutter-md">
          <div
            v-for="round in fundraisings?.fundraising_rounds"
            :key="round.id"
            class="col-6"
          >
            <router-link :to="{name: RouteNames.FundraisingRound, params: { id: round.id }}">
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
                                  {{ unlockSchemeToString(scheme as any) }}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <fundraising-round-status :status="round.status!" />
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </router-link>
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
import { createApiInstance } from '@/api/token';
import { Fundraising } from '@/api/token/Fundraising';
import useRequest from '@/composition/useRequest';
import { useDateFormatters, useFormatNumber } from '@/composition/useFormatters';
import { useToken } from '@/composition/business/useToken';
import FundraisingRoundStatus from '@/components/Fundraising/FundraisingRoundStatus.vue';
import UiInfoCard from '@/components/ui/UiInfoCard.vue';
import { useMath } from '@/composition/useMath';
import { RouteNames } from '@/router/routeNames';

const fundraisingApi = createApiInstance(Fundraising);

const { formatFromTimestamp } = useDateFormatters();
const { currencyFormat, numberFormat } = useFormatNumber();
const { unlockSchemeToString } = useToken();
const { calcSum } = useMath();
const { sendRequest: fundraisingList, responseData: fundraisings } = useRequest({
  request: () => fundraisingApi.fundraisingList().then((data) => data!.data!.data!),
});

const totalSupply = computed(() => calcSum(fundraisings.value?.fundraising_rounds?.map(({ token_amount }) => token_amount ?? 0) ?? []));
const totalRaised = computed(() => calcSum(fundraisings.value?.fundraising_rounds?.map(({ raise_usd }) => raise_usd ?? 0) ?? []));
const foundingRounds = computed(() => numberFormat(fundraisings.value?.fundraising_rounds?.length ?? 0));
const stakeholders = computed(() => calcSum(fundraisings.value?.fundraising_rounds?.map(({ investors }) => investors?.length ?? 0) ?? []));

fundraisingList();
</script>
