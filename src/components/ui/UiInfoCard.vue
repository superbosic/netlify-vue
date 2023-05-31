<template>
  <q-card
    flat
    bordered
    class="ui-info-card"
  >
    <q-card-section>
      <div class="row items-center">
        <div
          v-if="iconName"
          class="ui-info-card__icon-box row items-center justify-center q-mr-md"
        >
          <q-icon
            :name="iconName"
            color="primary"
            size="36px"
          />
        </div>
        <div>
          <div class="text-h5">
            <slot>
              {{ value }}
            </slot>
          </div>
          <div class="text-caption text-grey-7 q-mt-sm">
            {{ name }}
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
const props = defineProps<{
    name: string,
    value?: string | number,
    iconName?: string,
}>();
</script>
<style lang="scss">
.ui-info-card {
  &__icon-box {
    position: relative;
    width: 48px;
    height: 48px;

    &:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: #22C55E;
      opacity: .2;
      border-radius: 50%;
    }
  }
}
</style>
