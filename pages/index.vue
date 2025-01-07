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

    <div class="scrollDown mt-2">
      <a><span></span><span></span><span></span><span></span></a>
    </div>


    <section id="rates" class="border-t-4 border-white" style="background: url(https://picsum.photos/1200/800?image=869) center center / cover no-repeat;">
      <div class="text-center p-10">
        <h3 class="text-6xl text-white">Tarifs</h3>
      </div>
      <div id="rates"
           class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">

      </div>
      <RateComponent v-for="rate in data.rates" :rate="rate.data" />
    </section>


    <section class="border-t-4 border-white">
      <div class="text-center p-10">
        <h3 class="text-6xl text-white">Programme</h3>
      </div>
    </section>

    <section class="border-t-4 border-white">
      <div class="text-center p-10">
        <h3 class="text-6xl text-white">Emplacement</h3>
      </div>
    </section>

    <section class="border-t-4 border-white">
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

<style scoped>
section {
  position: relative;
  width: 100%;
  height: 100%;
}

.scrollDown a {
  padding-top: 80px;
}

.scrollDown a span {
  position: absolute;
  //top: 0;
  left: 50%;
  width: 24px;
  height: 24px;
  margin-left: -12px;
  border-left: 1px solid #fff;
  border-bottom: 1px solid #fff;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-animation: sdb07 2s infinite;
  animation: sdb07 2s infinite;
  opacity: 0;
  box-sizing: border-box;
}
.scrollDown a span:nth-of-type(1) {
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
}
.scrollDowna span:nth-of-type(2) {
  top: 16px;
  -webkit-animation-delay: .15s;
  animation-delay: .15s;
}
.scrollDown a span:nth-of-type(3) {
  top: 32px;
  -webkit-animation-delay: .3s;
  animation-delay: .3s;
}
@-webkit-keyframes sdb07 {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes sdb07 {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

</style>