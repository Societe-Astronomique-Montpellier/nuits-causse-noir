<script setup lang="ts">
const props = defineProps<{
  data: any
}>();
const { data } = toRefs(props);

const ProgramDayCard = defineAsyncComponent(() => import('@/components/cards/ProgramDayCard.vue'));
const { isMobile } = useDevice();
const { locale } = useI18n();
const localePath = useLocalePath();
</script>

<template>
  <div
    :class="isMobile ? `p-2` : `p-5`"
    class="max-w-screen-xl mx-auto"
  >
    <div class="grid md:grid-cols-2 sm:grid-cols-1 md:gap-8 sm:gap-4">
      <ProgramDayCard v-for="(events, day) in data.events" :day="day" :events="events"  />
    </div>

    <div class="mt-4 flex-inline items-center justify-center">
<!--      <prismic-link-->
<!--        :to="localePath('/program', locale)"-->
<!--        type="button"-->
<!--        class="-->
<!--              group inline-flex items-center px-8 py-4 rounded-full-->
<!--              text-lg font-semibold-->
<!--              text-neutral-100 bg-green-700-->
<!--              hover:bg-zinc-800 hover:border-green-500 hover:border-2-->
<!--              transition-all duration-300-->
<!--              focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-black"-->
<!--      >-->
<!--        {{ $t('layout.more_details') }}-->
<!--      </prismic-link>-->
    </div>
  </div>
</template>

<style scoped>

</style>