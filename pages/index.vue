<script setup lang="ts">
import type {AllDocumentTypes, EventDocument, HomepageDocument, RateDocument} from "~/prismicio-types";
import {isFilled, asLink} from "@prismicio/helpers";
import { type ImageField, type LinkField} from "@prismicio/client";
import type {ComputedRef} from "vue";
import {LinkType} from "@prismicio/types";

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
        ],
        orderings: {
          field: "my.rate.position",
          direction: "asc",
        }
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
const ImageCopyright = defineAsyncComponent(() => import('@/components/layouts/imageCopyright.vue'))
const RateComponent = defineAsyncComponent(() => import('@/components/RateCard.vue'));
const ExpandableGalleryComponent = defineAsyncComponent(() => import('@/components/ExpandableGallery.vue'));
const YoutubeComponent = defineAsyncComponent(() => import('@/components/layouts/YoutubeVideo.vue'))

const richTextSerializer = useRichTextSerializer();

const optimizedImage: ComputedRef<ImageField<never> | undefined> = computed<ImageField<never> | undefined>(() => data?.value?.homepage.data.image_description);
const gridRatesNumber: ComputedRef<number> = computed<number>(() => (0 === 2 % (data.value?.rates?.length ?? 0)) ? 2: 3);

type GroupedByDay = Record<string, EventDocument[]>;
const groupedByDay: ComputedRef<GroupedByDay | undefined> = computed<GroupedByDay | undefined>(() => {
  return data.value?.events.reduce<GroupedByDay>((acc: GroupedByDay, event: EventDocument) => {
    const day = event.data.date_event?.split('T')[0]; // Extract the date part (YYYY-MM-DD)
    if (day !== undefined && !acc[day]) {
      acc[day] = [];
    }

    if (day !== undefined) {
      acc[day].push(event);
    }
    return acc;
  }, {});
});

const pradinesCoordinates: ComputedRef<[number, number]> = computed<[number, number]>(() => [data.value?.homepage.data.place_coords.latitude as number, data.value?.homepage.data.place_coords.longitude as number]);
const images: ComputedRef<string[] | undefined> = computed<string[] | undefined>(() => data.value?.homepage.data.gallery.map(image => image.image.url as string));
const youtubeVideoId: ComputedRef<string | null> = computed<string | null>(() => {
  const youtubeLinkField: LinkField | undefined = data.value?.homepage.data.youtube_link;
  if (isFilled.link(youtubeLinkField) && youtubeLinkField.link_type === LinkType.Web) {
    const youtubeLink = asLink(youtubeLinkField) as string;
    return (new URL(youtubeLink).searchParams.get("v"));
  }

  return null;
});

const metaTitle: ComputedRef<string | null> = computed<string | null>(() => isFilled.keyText(data.value?.homepage.data.meta_title) ? `${data.value?.homepage.data.meta_title}`: `${data.value?.homepage.data.title}`);
const metaDesc: ComputedRef<string | null> = computed<string | null>(() => isFilled.keyText(data.value?.homepage.data.meta_description) ? `${data.value?.homepage.data.meta_description}`: `${data.value?.homepage.data.subtitle}`);
useSeoMeta({
  title: (): string | null => unref(metaTitle),
  description: (): string | null  => unref(metaDesc)
});
</script>
<template>

  <div v-if="data" class="scroll-smooth">
    <HeroComponent
      :isOpen="data.homepage.data.enable_site"
      :title-hero="data?.homepage.data.title"
      :subtitle="data?.homepage.data.subtitle"
      :date-start="data?.homepage.data.date_start"
      :date-end="data?.homepage.data.date_end"
      :logo="data?.homepage.data.logo"
      :subscribe-link="data.homepage.data.subscribe_link"
    />

    <div v-if="true === data.homepage.data.enable_site">

      <section id="description" class="w-full md:py-14 py-14 md:bg-cover md:bg-center bg-contain border-t bg-fixed bg-no-repeat bg-center justify-center">
        <div class="max-w-screen-xl mx-auto p-5">
          <div class="grid max-w-screen-xl px-4 py-4 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div class="mr-auto place-self-center lg:col-span-7">
              <prismic-rich-text
                  :field="data.homepage.data.description"
                  :serializer="richTextSerializer"
                  class="max-w-2xl text-neutral-200 mb-6 font-thin lg:mb-8 text-lg"
              />
            </div>
            <div class="lg:mt-0 lg:col-span-5 lg:flex rounded-lg">
              <ImageCopyright :image="optimizedImage" />
            </div>
          </div>
        </div>
      </section>


      <section
          id="tarifs"
          class="w-full bg-rates md:py-14 py-14 md:bg-cover md:bg-center bg-contain border-t bg-fixed bg-no-repeat bg-center justify-center "
      >
        <div class="container flex items-center justify-center mx-auto">
          <div class="bg-white hover:bg-zinc-400 transition duration-300 shadow-xl rounded-xl p-4 text-center md:p-6 my-8" >
            <h3 class="text-4xl uppercase">Tarifs</h3>
          </div>
        </div>
        <div class="max-w-screen-xl mx-auto p-5">
          <div :class="`grid grid-cols-${gridRatesNumber} md:grid-cols-${gridRatesNumber} sm:grid-cols-1 gap-10`">
            <RateComponent v-for="rate in data.rates" :rate="rate.data" />
          </div>
        </div>
      </section>



      <section
          id="programme"
          class="w-full bg-program md:py-14 py-14 md:bg-cover md:bg-center bg-contain border-t bg-fixed bg-no-repeat bg-center justify-center ">
        <div class="container flex items-center justify-center mx-auto">
          <div class="bg-white hover:bg-zinc-400 transition duration-300 shadow-xl rounded-xl p-4 text-center md:p-6 my-8" >
            <h3 class="text-4xl uppercase">Programme</h3>
          </div>
        </div>
        <div class="max-w-screen-xl mx-auto p-5">
          <div class="grid grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-8">
            <ProgramDayCard v-for="(events, day) in groupedByDay" :day="day" :events="events"  />
          </div>
        </div>
      </section>


      <section id="lieu" class="w-full bg-place md:py-14 py-14 md:bg-cover md:bg-center bg-contain border-t bg-fixed bg-no-repeat bg-center justify-center">
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


      <section id="galerie" class="w-full bg-zinc-400 bg-gallery md:py-14 py-14 md:bg-cover md:bg-center bg-contain border-t bg-fixed bg-no-repeat bg-center justify-center">
        <div class="container flex items-center justify-center mx-auto">
          <div class="bg-white hover:bg-zinc-400 transition duration-300 shadow-xl rounded-xl p-4 text-center md:p-6 my-8" >
            <h3 class="text-4xl uppercase">Galerie</h3>
          </div>
        </div>
        <div class="max-w-screen-xl mx-auto p-5">
          <ExpandableGalleryComponent
            v-if="images"
            :images="images"
            class="p-4"
          />

          <youtube-component v-if="null !== youtubeVideoId" :youtubeId="youtubeVideoId" />

        </div>
      </section>

      <section id="contact" class="w-full md:py-14 py-14 md:bg-cover md:bg-center bg-contain border-t bg-fixed bg-no-repeat bg-center justify-center">
        <div class="container flex items-center justify-center mx-auto">
          <div class="bg-white hover:bg-zinc-400 transition duration-300 shadow-xl rounded-xl p-4 text-center md:p-6 my-8" >
            <h3 class="text-4xl uppercase">Contact</h3>
          </div>
        </div>
        <div class="max-w-screen-xl mx-auto p-5">
        </div>
      </section>
    </div>



  </div>
</template>

<style scoped>
.bg-rates {
  background-image: url('/img/bkg_2000.jpg')
}

.bg-program {
  background-image: url('/img/bkg2_2000.jpg')
}

.bg-place {
  background-image: url('https://www.nuits-causse-noir.fr/img/pradines.jpg')
}

.bg-gallery {
  background-image: url("/img/zebra.png");
}
</style>