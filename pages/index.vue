<script setup lang="ts">
import type {AllDocumentTypes, EventDocument, HomepageDocument, RateDocument} from "~/prismicio-types";
import type {PointExpression} from "leaflet";
import type {GeoPoint} from "@prismicio/types-internal/lib/customtypes";

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

const pradinesCoordinates: ComputedRef<[number, number]> = computed<[number, number]>(() => [data.value?.homepage.data.place_coords.latitude as number, data.value?.homepage.data.place_coords.longitude as number]);

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

    <section
      id="rates"
      class="w-full bg-lights md:py-14 py-14 md:bg-cover md:bg-center bg-contain border-t bg-fixed bg-no-repeat bg-center justify-center "
    >
      <div class="container flex items-center justify-center mx-auto">
        <div class="bg-white hover:bg-zinc-400 transition duration-300 shadow-xl rounded-xl p-4 text-center md:p-6 my-8" >
          <h3 class="text-4xl uppercase">Tarifs</h3>
        </div>
      </div>

      <div class="max-w-screen-xl mx-auto p-5">
        <div class="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
          <RateComponent v-for="rate in data.rates" :rate="rate.data" />
        </div>
      </div>

    </section>

    <section
      class="w-full md:py-14 py-14 md:bg-cover md:bg-center bg-contain border-t bg-fixed bg-no-repeat bg-center justify-center ">
      <div class="container flex items-center justify-center mx-auto">
        <div class="bg-white hover:bg-zinc-400 transition duration-300 shadow-xl rounded-xl p-4 text-center md:p-6 my-8" >
          <h3 class="text-4xl uppercase">Programme</h3>
        </div>
      </div>
      <div class="max-w-screen-xl mx-auto p-5">
        <div class="grid grid-cols-2 md:grid-cols-3 sm:grid-cols-2 gap-1">
        </div>
        <pre class="grid">{{ data.events }}</pre>
      </div>
    </section>

    <section class="w-full bg-place md:py-14 py-14 md:bg-cover md:bg-center bg-contain border-t bg-fixed bg-no-repeat bg-center justify-center">
      <div class="container flex items-center justify-center mx-auto">
        <div class="bg-white hover:bg-zinc-400 transition duration-300 shadow-xl rounded-xl p-4 text-center md:p-6 my-8" >
          <h3 class="text-4xl uppercase">Le lieu</h3>
        </div>
      </div>

      <div class="max-w-screen-xl mx-auto p-5 wrapper antialiased text-gray-900">
        <div>
          <div class="relative px-4 ">
            <div class="bg-white p-6 rounded-lg shadow-lg">
              <h4 class="mt-1 text-xl font-semibold uppercase leading-tight truncate">{{ data.homepage.data.place_name }}</h4>

              <div class="border-green-500 border-4 rounded-xl my-4"><LMap
                  style="height: 600px"
                  :zoom="15"
                  :center="pradinesCoordinates"
                  :use-global-leaflet="false"
              >
                <LTileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                    layer-type="base"
                    name="OpenStreetMap"
                />
                <LMarker :lat-lng="pradinesCoordinates" />
              </LMap></div>

              <div class="mt-4">
                <button class="bg-green-500 text-white py-2 px-12 rounded-full font-bold hover:bg-zinc-800">Site internet</button>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>

    <section
        class="
      w-full  md:py-52 py-28 md:bg-cover md:bg-center bg-contain border-t bg-fixed bg-no-repeat
      bg-center flex items-center justify-center
    ">
      <div class="container flex items-center justify-center mx-auto">
        <div class="bg-white hover:bg-zinc-400 transition duration-300 shadow-xl rounded-xl p-4 text-center md:p-6 my-8" >
          <h3 class="text-4xl uppercase">Galerie</h3>
        </div>
      </div>
      <div class="max-w-screen-xl mx-auto p-5">
      </div>
    </section>

    <section
        class="
      w-full  md:py-52 py-28 md:bg-cover md:bg-center bg-contain border-t bg-fixed bg-no-repeat
      bg-center flex items-center justify-center
    ">
      <div class="container flex items-center justify-center mx-auto">
        <div class="bg-white hover:bg-zinc-400 transition duration-300 shadow-xl rounded-xl p-4 text-center md:p-6 my-8" >
          <h3 class="text-4xl uppercase">Contact</h3>
        </div>
      </div>
      <div class="max-w-screen-xl mx-auto p-5">
      </div>
    </section>

  </div>
</template>

<style scoped>
.bg-lights{
  background-image: url('https://i.pinimg.com/originals/bd/05/8f/bd058fbaee7be1f65cd197a41d774d91.jpg')
}

.bg-place {
  background-image: url('https://www.nuits-causse-noir.fr/img/pradines.jpg')
}
</style>