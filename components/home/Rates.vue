<script setup lang="ts">
const RateComponent = defineAsyncComponent(() => import('@/components/cards/RateCard.vue'));
const props = defineProps<{
  data: any
}>();
const { data } = toRefs(props);

const { isMobile } = useDevice();
</script>

<template>
  <div
    :class="isMobile ? `p-2` : `p-5`"
    class="max-w-screen-xl mx-auto">
    <div :class="`grid md:grid-cols-${data.gridRatesNumber} sm:grid-cols-1 gap-10`">
      <RateComponent v-for="rate in data.listRates" :rate="rate.data" />
    </div>
  </div>
</template>

<style scoped>

</style>