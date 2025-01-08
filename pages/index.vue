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
        lang: locale.value,
        filters: [
            prismic.filter.at('my.rate.display', true)
        ]
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
const RateComponent = defineAsyncComponent(() => import('@/components/RateCard.vue'));

// useSeoMeta({
//   title: prismic.asText(data?.homepage.data.title)
// });
</script>
<template>
  <div v-if="data">
    <HeroComponent
      :title-hero="data?.homepage.data.title"
      :subtitle="data?.homepage.data.subtitle"
      :date-start="data?.homepage.data.date_start"
      :date-end="data?.homepage.data.date_end"
      :logo="data?.homepage.data.logo"
      :subscribe-link="data.homepage.data.subscribe_link"
    />

    <section id="rates" class="border-t-2 border-white" style="background: url(https://picsum.photos/1200/800?image=869) center center / cover no-repeat;">
      <div class="text-center p-10">
        <h3 class="text-6xl text-white">Tarifs</h3>
      </div>

      <div class="py-16">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-16">
            <RateComponent v-for="rate in data.rates" :rate="rate.data" />
          </div>
        </div>
      </div>
    </section>


    <section class="border-t-2 border-white">
      <div class="text-center p-10">
        <h3 class="text-6xl text-white">Programme</h3>
      </div>
    </section>

    <section class="border-t-2 border-white">
      <div class="text-center p-10">
        <h3 class="text-6xl text-white">Emplacement</h3>
      </div>
    </section>

    <section class="border-t-2 border-white">
      <div class="text-center p-10">
        <h3 class="text-6xl text-white">Galerie</h3>
      </div>
    </section>

    <section  class="border-t-4 border-white"
    >
      <div class="text-center p-10">
        <h3 class="text-6xl text-white">Contact</h3>
      </div>
    </section>>
  </div>
</template>
