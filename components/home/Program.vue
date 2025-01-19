<script setup lang="ts">
const props = defineProps<{
  data: any
}>();
const { data } = toRefs(props);

const ProgramDayCard = defineAsyncComponent(() => import('@/components/cards/ProgramDayCard.vue'));
const { isMobile } = useDevice();
</script>

<template>
  <div
    :class="isMobile ? `p-2` : `p-5`"
    class="max-w-screen-xl mx-auto"
  >
    <div class="grid md:grid-cols-2 sm:grid-cols-1 md:gap-8 sm:gap-4">
      <ProgramDayCard v-for="(events, day) in data.events" :day="day" :events="events"  />
    </div>
  </div>
</template>

<style scoped>

</style>