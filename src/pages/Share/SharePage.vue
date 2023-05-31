<template>
  <div class="q-pa-md">
    <div class="text-h6 q-mb-md">
      [INC] Innocode
    </div>
    <div>
      <div class="row q-col-gutter-md">
        <div class="col-8 q-gutter-md">
          <div>
            <div class="row q-col-gutter-md">
              <div class="col-4">
                <ui-info-card
                  name="Team Members"
                  :value="numberFormat(0)"
                  icon-name="group"
                />
              </div>
              <div class="col-4">
                <ui-info-card
                  name="Investors"
                  :value="numberFormat(0)"
                  icon-name="group"
                />
              </div>
              <div class="col-4">
                <ui-info-card
                  name="Fundraising Rounds"
                  :value="numberFormat(0)"
                  icon-name="change_circle"
                />
              </div>
              <div class="col-4">
                <ui-info-card
                  name="Total Fund Raised"
                  :value="currencyFormat(0)"
                  icon-name="attach_money"
                />
              </div>
              <div class="col-4">
                <ui-info-card
                  name="Current Round"
                  value="Not Yet Started"
                  icon-name="change_circle"
                />
              </div>
              <div class="col-4">
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
        <div class="col-4 q-gutter-md">
          <div>
            <q-card
              flat
              bordered
            >
              <q-card-section>
                <div class="text-h5">
                  Project Details
                </div>
              </q-card-section>
              <q-card-section>
                <div
                  class="q-gutter-sm"
                  style="width: 260px"
                >
                  <ui-field-info
                    name="Project Name"
                    :value="project?.name"
                  />
                  <ui-field-info
                    name="Legal Entity Name"
                    value="None"
                  />
                  <ui-field-info
                    name="Project Description"
                    value="None"
                  />
                  <ui-field-info
                    name="Company Website"
                    value="None"
                  />
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div>
            <q-card
              flat
              bordered
            >
              <q-card-section>
                <div class="text-h5">
                  Token Details
                </div>
              </q-card-section>
              <q-card-section>
                <div
                  class="q-gutter-sm"
                  style="width: 260px"
                >
                  <ui-field-info
                    name="Project Status"
                    value="Pre-TGE"
                  />
                  <ui-field-info
                    name="Planned TGE Date"
                    value="May 24, 2023"
                  />
                  <ui-field-info
                    name="Token Ticker:"
                    value="INC"
                  />
                  <ui-field-info
                    name="Token Address"
                    value="None"
                  />
                  <ui-field-info
                    name="Token Network"
                    value="Polygon"
                  />
                  <ui-field-info
                    name="Monetary Policy"
                    value="Fixed"
                  />
                  <ui-field-info
                    name="Policy Description"
                    value="Number"
                  />
                  <ui-field-info
                    name="Total Token Supply"
                    :value="currencyFormat(1000000)"
                  />
                  <ui-field-info
                    name="Max Token Supply:"
                    :value="currencyFormat(1000000)"
                  />
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div>
            <q-card
              flat
              bordered
            >
              <q-card-section>
                <div class="text-h5">
                  Top 10 Stakeholders
                </div>
              </q-card-section>
              <q-card-section>
                <div
                  class="row items-center justify-center"
                  style="height: 200px"
                >
                  No Token Holder Available
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { Chart } from 'highcharts-vue';
import UiInfoCard from '@/components/ui/UiInfoCard.vue';
import { useFormatNumber } from '@/composition/useFormatters';
import { useProjectStore } from '@/store/project';
import UiFieldInfo from '@/components/ui/UiFieldInfo.vue';
import UiChartLegendItem from '@/components/ui/UiChartLegendItem.vue';

const { currencyFormat, percentFormat, numberFormat } = useFormatNumber();
const { project } = useProjectStore();

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
