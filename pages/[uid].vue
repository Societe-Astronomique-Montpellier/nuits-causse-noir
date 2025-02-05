<script setup lang="ts">
import type {AllDocumentTypes, EventDocument, LandingPageDocument} from "~/prismicio-types";
import { useGroupEvents } from "~/composables/useGroupEvents";
import {useAsyncData} from "#imports";

definePageMeta({
  layout: 'home',
})

const route = useRoute();
const { locale, locales } = useI18n();
const prismic = usePrismic();
const { isMobile } = useDevice();

const { lang, uid } = route.params as { lang: string | undefined, uid: string };

const prismicFetchData = async() => {
  console.log(locales );

  const currentLang = locales.value.find(l => l.code === lang).iso;
  const [program, events] = await Promise.all([
    (
      await prismic.client.getByUID('landing_page', uid, { lang: currentLang}) as LandingPageDocument
    ),
    (
      await prismic.client.getAllByType<AllDocumentTypes>("event", {
        lang: currentLang,
        orderings: {
          field: 'my.event.date_event',
        },
      }) as EventDocument[]
    )
  ])
  return { program, events }
};
const { data, error } = await useAsyncData('data', prismicFetchData, { watch: [locale]});

const ProgramDayCard = defineAsyncComponent(() => import('@/components/cards/ProgramDayCard.vue'));
</script>

<template>
  <div v-if="data">
    <h1>{{ data?.program?.data.title }}</h1>

    <div v-if="data?.events">
      <div
          :class="isMobile ? `p-2` : `p-5`"
          class="max-w-screen-xl mx-auto"
      >
        <div class="grid grid-cols-1 md:gap-8 sm:gap-4">
          <ProgramDayCard v-for="(events, day) in useGroupEvents(data?.events)" :day="day" :events="events">
            <template #event-description>
              <div>Description plus detaillée de l event</div>
            </template>
          </ProgramDayCard>
        </div>
      </div>
    </div>
  </div>




</template>

<style scoped>

</style>