<script setup lang="ts">
const props = defineProps<{
  data: any
}>();
const { data } = toRefs(props);

const ProgramDayCard = defineAsyncComponent(() => import('@/components/cards/ProgramDayCard.vue'));
</script>

<template>
  <div class="max-w-screen-xl mx-auto p-5">
    <div class="grid grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-8">
      <ProgramDayCard v-for="(events, day) in data.events" :day="day" :events="events"  />
    </div>
  </div>
</template>

<style scoped>

</style>