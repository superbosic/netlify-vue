<template>
  <div>
    <div class="q-pa-lg bg-white">
      <div class="row">
        <div class="text-h5">
          [{{ projectInformation?.id }}] {{ projectInformation?.name }}
        </div>
        <q-space />
        <div class="row">
          <q-btn
            :to="{name: RouteNames.Settings}"
            icon="settings"
            label="Settings"
            color="greyscale-700"
            no-caps
            outline
          />
          <q-btn
            class="q-ml-md"
            icon="share"
            label="Share Project TokenTable"
            color="greyscale-700"
            no-caps
            outline
          />
        </div>
      </div>
    </div>
    <q-separator />
    <div class="q-pa-lg q-gutter-md">
      <div>
        <div class="row q-col-gutter-md">
          <div class="col-3">
            <ui-info-card
              name="Token Holders"
              :value="numberFormat(0)"
              icon-name="group"
            />
          </div>
          <div class="col-3">
            <ui-info-card
              name="Current Round"
              value="Not Yet Started"
              icon-name="change_circle"
            />
          </div>
          <div class="col-3">
            <ui-info-card
              name="Total Fund Raised"
              :value="currencyFormat(0)"
              icon-name="attach_money"
            />
          </div>
          <div class="col-3">
            <ui-info-card
              name="Total Token Allocated"
              :value="`${numberFormat(0)} (${percentFormat(0)})`"
              icon-name="generating_tokens"
            />
          </div>
        </div>
      </div>
      <div>
        <div class="row">
          <div class="col">
            <q-card
              flat
              bordered
            >
              <q-card-section>
                <div class="text-h5">
                  Total Planned Allocation
                </div>
              </q-card-section>
              <q-card-section>
                <div class="row items-center">
                  <div class="col-4">
                    <chart :options="chartOptions" />
                  </div>
                  <div class="col-8">
                    <div class="row q-col-gutter-md">
                      <div class="col-4">
                        <ui-chart-legend-item
                          color="primary"
                          name="Community"
                          :value="currencyFormat(10)"
                        />
                      </div>
                      <div class="col-4">
                        <ui-chart-legend-item
                          color="teal"
                          name="Advisors"
                          :value="currencyFormat(20)"
                        />
                      </div>
                      <div class="col-4">
                        <ui-chart-legend-item
                          color="sky"
                          name="Advisors"
                          :value="currencyFormat(20)"
                        />
                      </div>
                      <div class="col-4">
                        <ui-chart-legend-item
                          color="orange"
                          name="Founders"
                          :value="currencyFormat(20)"
                        />
                      </div>
                      <div class="col-4">
                        <ui-chart-legend-item
                          color="amber"
                          name="Core Members"
                          :value="currencyFormat(20)"
                        />
                      </div>
                      <div class="col-4">
                        <ui-chart-legend-item
                          color="greyscale-200"
                          name="Unassigned"
                          :value="currencyFormat(20)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
      <div>
        <div class="row">
          <div class="col">
            <q-card
              flat
              bordered
            >
              <q-card-section>
                <div class="row justify-between text-h5">
                  <div>
                    Unlocking Schedules
                  </div>
                  <div class="text-h6 row">
                    <div class="text-body-dark">
                      Planned to start on&nbsp;
                    </div>
                    24 May, 2023
                  </div>
                </div>
              </q-card-section>
              <q-card-section>
                <chart
                  :options="lineChartOptions"
                />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
    <!--    <div class="row items-center">
      <div class="col-6">
        <router-link :to="{name: RouteNames.ProjectEdit}">
          <q-card
            flat
            bordered
          >
            <q-card-section>
              <div class="text-h5">
                {{ title }}
              </div>
            </q-card-section>
            <q-card-section>
              <div style="max-width: 350px">
                <q-list>
                  <q-item dense>
                    <q-item-section>
                      created at:
                    </q-item-section>
                    <q-item-section>
                      {{ formatFromTimestamp(projectInformation?.created_at) }}
                    </q-item-section>
                  </q-item>
                  <q-item dense>
                    <q-item-section>
                      max token supply:
                    </q-item-section>
                    <q-item-section>
                      {{ projectInformation?.max_token_supply }}
                    </q-item-section>
                  </q-item>
                  <q-item dense>
                    <q-item-section>
                      token network:
                    </q-item-section>
                    <q-item-section>
                      {{ projectInformation?.token_network }}
                    </q-item-section>
                  </q-item>
                  <q-item dense>
                    <q-item-section>
                      token ticker:
                    </q-item-section>
                    <q-item-section>
                      {{ projectInformation?.token_ticker }}
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </q-card-section>
          </q-card>
        </router-link>
      </div>
    </div>-->
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { Chart } from 'highcharts-vue';
import { RouteNames } from '@/router/routeNames';

import { useDateFormatters, useFormatNumber } from '@/composition/useFormatters';
import { useProjectStore } from '@/store/project';
import UiInfoCard from '@/components/ui/UiInfoCard.vue';
import UiChartLegendItem from '@/components/ui/UiChartLegendItem.vue';

const { project: projectInformation } = useProjectStore();
const { numberFormat, currencyFormat, percentFormat } = useFormatNumber();
const { formatFromTimestamp } = useDateFormatters();
const title = computed(() => projectInformation.value?.name ?? '');
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
      innerSize: '90%',
      data: [
        {
          name: 'Community',
          y: 10,
          color: '#22C55E',
        },
        {
          name: 'Advisors',
          y: 20,
          color: '#38BDF8',
        },
        {
          name: 'FF784B',
          y: 15,
          color: '#2DD4BF',
        },
        {
          name: 'Core Members',
          y: 15,
          color: '#FFD023',
        },
        {
          name: 'Unassigned',
          y: 15,
          color: '#EDF2F7',
        },
      ],
      color: '#6fcd98',
    },
  ],
  credits: {
    enabled: false,
  },
}));
const lineChartOptions = {
  chart: {
    type: 'area',
  },
  title: {
    text: '',
    enable: false,
  },
  yAxis: {
    opposite: true,
    title: {
      text: 'Tokens',
    },
  },
  tooltip: {
    shared: true,
    headerFormat: '<span style="font-size:12px"><b>{point.key}</b></span><br>',
  },
  plotOptions: {
    series: {
      pointStart: 1,
    },
    area: {
      stacking: 'normal',
      lineColor: '#666666',
      lineWidth: 1,
      marker: {
        enabled: false,
      },
    },
  },
  series: [],
  credits: {
    enabled: false,
  },
};
</script>
