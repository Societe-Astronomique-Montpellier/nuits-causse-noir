<script setup lang="ts">
const RateComponent = defineAsyncComponent(() => import('@/components/cards/RateCard.vue'));
const props = defineProps<{
  data: any
}>();
const { data } = toRefs(props);
</script>

<template>
  <div class="max-w-screen-xl mx-auto p-5">
    <div :class="`grid grid-cols-${data.gridRatesNumber} md:grid-cols-${data.gridRatesNumber} sm:grid-cols-1 gap-10`">
      <RateComponent v-for="rate in data.listRates" :rate="rate.data" />
    </div>
  </div>
</template>

<style scoped>

</style>