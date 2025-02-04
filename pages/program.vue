<script setup lang="ts">
import type {AllDocumentTypes, EventDocument} from "~/prismicio-types";
import {useGroupEvents} from "~/composables/useGroupEvents";

const { locale, locales } = useI18n();
const prismic = usePrismic();
const { isMobile } = useDevice();

definePageMeta({
  layout: "home",
});

const { data: events, error } = useAsyncData('events', async () => {
  const currentLang = locales.value.find(l => l.code === locale.value).iso;
  return await prismic.client.getAllByType<AllDocumentTypes>("event", {
    lang: currentLang,
    orderings: {
      field: 'my.event.date_event',
    },
  }) as EventDocument[]
}, { watch: [locale]});
// type GroupedByDay = Record<string, EventDocument[]>;
// const groupedByDay: ComputedRef<GroupedByDay | undefined> = computed<GroupedByDay | undefined>(() => useGroupEvents(events?.value));
const ProgramDayCard = defineAsyncComponent(() => import('@/components/cards/ProgramDayCard.vue'));
</script>

<template>
  <div v-if="events">
    <div
      :class="isMobile ? `p-2` : `p-5`"
      class="max-w-screen-xl mx-auto"
    >
      <div class="grid grid-cols-1 md:gap-8 sm:gap-4">
        <ProgramDayCard v-for="(events, day) in useGroupEvents(events)" :day="day" :events="events">
          <template #event-description>
            <div>Description plus detaillée de l event</div>
          </template>
        </ProgramDayCard>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>