<script setup lang="ts">
import type {AllDocumentTypes, EventDocument, HomepageDocument, RateDocument} from "~/prismicio-types";

const { locale } = useI18n();
const prismic = usePrismic();

definePageMeta({
  layout: "home",
});

const prismicFetchData = async() => {
  const [homepage, rates, events] = await Promise.all([
    (
      await prismic.client.getSingle("homepage", {
        lang: locale.value
      }) as HomepageDocument
    ),
    (
      await prismic.client.getAllByType<AllDocumentTypes>("rate", {
        lang: locale.value
      }) as RateDocument[]
    ),
    (
      await prismic.client.getAllByType<AllDocumentTypes>("event", {
        lang: locale.value,
        orderings: {
          field: 'my.event.date_event',
        }
      }) as EventDocument[]
    )
  ]);

  return { homepage, rates, events }
};

const { data, error } = useAsyncData('data', prismicFetchData);

const HeroComponent = defineAsyncComponent(() => import('@/components/hero.vue'))
const RateComponent = defineAsyncComponent(() => import('@/components/RateCard.vue'))
</script>
<template>
  <div v-if="data">
    <HeroComponent
      :title-hero="data?.homepage.data.title"
      :subtitle="data?.homepage.data.subtitle"
      :date-start="data?.homepage.data.date_start"
      :date-end="data?.homepage.data.date_end"
      :logo="data?.homepage.data.logo"
      subscribe-link=""
    />

    <div class="text-center p-10">
      <h3 class="text-6xl text-white">Tarifs</h3>
    </div>
    <div class="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
      <div class="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">

        <RateComponent v-for="rate in data.rates" :rate="rate.data" />
      </div>
    </div>

  </div>
</template>
