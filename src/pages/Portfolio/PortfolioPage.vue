<template>
  <div class="q-pa-md relative-position">
    <div class="q-gutter-lg">
      <q-card
        v-for="project in projects || []"
        :key="project.id!"
        flat
        bordered
      >
        <q-card-section>
          <div class="row">
            <div class="col-auto">
              <div class="row q-col-gutter-md items-center">
                <div>
                  <q-avatar
                    icon="o_person"
                    color="grey-6"
                    text-color="white"
                  />
                </div>
                <div class="col">
                  <div class="text-bold">
                    {{ project.name }}
                  </div>
                </div>
              </div>
            </div>
            <q-space />
            <div class="row q-gutter-lg">
              <!--            <div class="col-auto">
              <div>
                <div class="text-bold">
                  {{ currencyFormat(12000000) }}
                </div>
                <div class="text-caption text-grey-7">
                  Current Valuation
                </div>
              </div>
            </div>-->
              <div class="col-auto">
                <div>
                  <div class="text-bold">
                    {{ getTotalInvestment(project.fundraising_rounds!) }}
                  </div>
                  <div class="text-caption text-grey-7">
                    Total Investment
                  </div>
                </div>
              </div>
              <div class="col-auto">
                <div>
                  <div class="text-bold text-capitalize">
                    {{ project.token_network }}
                  </div>
                  <div class="text-caption text-grey-7">
                    Network
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-table
            flat
            :columns="columns"
            :rows="project?.fundraising_rounds ?? []"
            :pagination="{ rowsPerPage: 0 }"
            hide-pagination
          >
            <template #body-cell-investment="{ row }">
              <q-td class="text-right">
                {{ currencyFormat(row.raise_usd) }}
              </q-td>
            </template>
            <template #body-cell-unlock_scheme="{ row }">
              <q-td class="text-right">
                {{ unlockSchemeToString(row.unlock_scheme) }}
              </q-td>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </div>
    <q-spinner
      v-if="loading"
      size="xl"
      color="primary"
      class="absolute-center"
    />
  </div>
</template>

<script lang="ts" setup>
import { QTableProps } from 'quasar';
import { useFormatNumber } from '@/composition/useFormatters';
import { createApiInstance } from '@/api/token';
import useRequest from '@/composition/useRequest';
import { Portfolio } from '@/api/token/Portfolio';
import { PortfolioListItemFundraisingRound } from '@/types/portfolio';
import { useToken } from '@/composition/business/useToken';

const { currencyFormat } = useFormatNumber();
const { unlockSchemeToString } = useToken();
const portfolioApi = createApiInstance(Portfolio);
const { loading, sendRequest: portfolioList, responseData: projects } = useRequest({
  request: () => portfolioApi.portfolioList().then((data) => data.data.data),
});

const columns: QTableProps['columns'] = [
  {
    label: 'Round',
    name: 'name',
    field: 'name',
  },
  {
    label: 'Investment',
    name: 'investment',
    field: 'raise_usd',
  },
  {
    label: 'Unlocked Schedule',
    name: 'unlock_scheme',
    field: 'unlock_scheme',
  },
];

function getTotalInvestment(items: PortfolioListItemFundraisingRound[]) {
  // eslint-disable-next-line no-param-reassign
  return currencyFormat(items.reduce((acc, item) => acc += item.raise_usd!, 0));
}

portfolioList();
</script>
