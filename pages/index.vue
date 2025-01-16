<script setup lang="ts">
import type {AllDocumentTypes, EventDocument, HomepageDocument, RateDocument} from "~/prismicio-types";
import {isFilled, asLink} from "@prismicio/helpers";
import {type ImageField, type LinkField, type RichTextField} from "@prismicio/client";
import type {ComputedRef} from "vue";
import {LinkType} from "@prismicio/types";

/**
 * Composables
 */
const { locale } = useI18n();
const prismic = usePrismic();
const { getComponent } = useDynamicComponent();

definePageMeta({
  layout: "home",
});

/**
 * Query
 */
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

const Hero = defineAsyncComponent(() => import('@/components/home/Hero.vue'))
const Description = defineAsyncComponent(() => import('@/components/home/Description.vue'));
const Rates = defineAsyncComponent(() => import('@/components/home/Rates.vue'));
const Program = defineAsyncComponent(() => import('@/components/home/Program.vue'));
const Place = defineAsyncComponent(() => import('@/components/home/Place.vue'));
const Gallery = defineAsyncComponent(() => import('@/components/home/Gallery.vue'))

// Description component
const description: ComputedRef<RichTextField | undefined> = computed<RichTextField | undefined>(() => data.value?.homepage.data.description)
const optimizedImage: ComputedRef<ImageField<never> | undefined> = computed<ImageField<never> | undefined>(() => data?.value?.homepage.data.image_description);

// Rates component
const gridRatesNumber: ComputedRef<number> = computed<number>(() => (0 === 2 % (data.value?.rates?.length ?? 0)) ? 2: 3);

// Program component
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

// Place component
const pradinesCoordinates: ComputedRef<[number, number]> = computed<[number, number]>(() => [data.value?.homepage.data.place_coords.latitude as number, data.value?.homepage.data.place_coords.longitude as number]);

// Gallery component
const images: ComputedRef<string[] | undefined> = computed<string[] | undefined>(() => data.value?.homepage.data.gallery.map(image => image.image.url as string));
const youtubeVideoId: ComputedRef<string | null> = computed<string | null>(() => {
  const youtubeLinkField: LinkField | undefined = data.value?.homepage.data.youtube_link;
  if (isFilled.link(youtubeLinkField) && youtubeLinkField.link_type === LinkType.Web) {
    const youtubeLink = asLink(youtubeLinkField) as string;
    return (new URL(youtubeLink).searchParams.get("v"));
  }

  return null;
});

interface IComponent {
  name: string,
  title: string | undefined,
  bg_class: string | undefined,
  data: any | undefined
}
const components: ComputedRef<IComponent[]> = computed<IComponent[]>(() => [
  {
    name: "description",
    title: "",
    bg_class: "",
    data: {text: description, image: optimizedImage}
  },
  {
    name: "rates",
    title: "Tarifs",
    bg_class: "bg-rates",
    data: {gridRatesNumber: gridRatesNumber, listRates: data.value?.rates}
  },
  {
    name: "program",
    title: "Programme",
    bg_class: "bg-program",
    data: {events: groupedByDay}
  },
  {
     name: "place",
     title: "Le lieu",
     bg_class: "bg-place",
     data: {title: data.value?.homepage.data.place_name, coordinate: pradinesCoordinates}
   },
   {
     name: "gallery",
     title: "Galerie",
     bg_class: "bg-gallery",
     data: { images: images, youtubeVideoId: youtubeVideoId}
   },
   // {
   //   name: "contact",
   //   title: "Contact",
   //   bg_class: "bg-contact",
   //   data: {}
   // }
]);
/**
 * SEO
 */
const metaTitle: ComputedRef<string | null> = computed<string | null>(() => isFilled.keyText(data.value?.homepage.data.meta_title) ? `${data.value?.homepage.data.meta_title}`: `${data.value?.homepage.data.title}`);
const metaDesc: ComputedRef<string | null> = computed<string | null>(() => isFilled.keyText(data.value?.homepage.data.meta_description) ? `${data.value?.homepage.data.meta_description}`: `${data.value?.homepage.data.subtitle}`);
useSeoMeta({
  title: (): string | null => unref(metaTitle),
  description: (): string | null  => unref(metaDesc)
});
</script>

<template>

  <div v-if="data" class="scroll-smooth">
    <Hero
      :isOpen="data.homepage.data.enable_site"
      :title-hero="data?.homepage.data.title"
      :subtitle="data?.homepage.data.subtitle"
      :date-start="data?.homepage.data.date_start"
      :date-end="data?.homepage.data.date_end"
      :logo="data?.homepage.data.logo"
      :subscribe-link="data.homepage.data.subscribe_link"
    />

    <div v-if="true === data.homepage.data.enable_site">
      <section
        id="description"
        class="w-full md:py-14 py-14 md:bg-cover md:bg-center bg-contain border-t bg-fixed bg-no-repeat bg-center justify-center"
      >
        <Description :data="{text: description, image: optimizedImage}" />
      </section>

      <section
        id="tarifs"
        class="w-full md:py-14 py-14 md:bg-cover md:bg-center bg-contain border-t bg-fixed bg-no-repeat bg-center justify-center bg-rates "
      >
        <div class="container flex items-center justify-center mx-auto">
          <div class="bg-white hover:bg-zinc-400 transition duration-300 shadow-xl rounded-xl p-4 text-center md:p-6 my-8" >
            <h3 class="text-4xl uppercase">Tarifs</h3>
          </div>
        </div>
        <Rates :data="{gridRatesNumber: gridRatesNumber, listRates: data.rates}" />
      </section>

      <section
          id="programme"
          class="w-full md:py-14 py-14 md:bg-cover md:bg-center bg-contain border-t bg-fixed bg-no-repeat bg-center justify-center bg-program"
      >
        <div class="container flex items-center justify-center mx-auto">
          <div class="bg-white hover:bg-zinc-400 transition duration-300 shadow-xl rounded-xl p-4 text-center md:p-6 my-8" >
            <h3 class="text-4xl uppercase">Programme</h3>
          </div>
        </div>
        <Program :data="{events: groupedByDay}" />
      </section>

      <section
          id="lieu"
          class="w-full md:py-14 py-14 md:bg-cover md:bg-center bg-contain border-t bg-fixed bg-no-repeat bg-center justify-center bg-place"
      >
        <div class="container flex items-center justify-center mx-auto">
          <div class="bg-white hover:bg-zinc-400 transition duration-300 shadow-xl rounded-xl p-4 text-center md:p-6 my-8" >
            <h3 class="text-4xl uppercase">Le lieu</h3>
          </div>
        </div>
        <Place :data="{title: data.homepage.data.place_name, coordinate: pradinesCoordinates}" />
      </section>


      <section
        id="galery"
        class="w-full md:py-14 py-14 md:bg-cover md:bg-center bg-contain border-t bg-fixed bg-no-repeat bg-center justify-center bg-gallery "
      >
        <div class="container flex items-center justify-center mx-auto">
          <div class="bg-white hover:bg-zinc-400 transition duration-300 shadow-xl rounded-xl p-4 text-center md:p-6 my-8" >
            <h3 class="text-4xl uppercase">Galerie</h3>
          </div>
        </div>
        <Gallery :data="{ images: images, youtubeVideoId: youtubeVideoId}" />
      </section>

      <section
          id="contact"
          class="w-full md:py-14 py-14 md:bg-cover md:bg-center bg-contain border-t bg-fixed bg-no-repeat bg-center justify-center bg-contact">
        <div class="container flex items-center justify-center mx-auto">
          <div class="bg-white hover:bg-zinc-400 transition duration-300 shadow-xl rounded-xl p-4 text-center md:p-6 my-8" >
            <h3 class="text-4xl uppercase">Contact</h3>
          </div>
        </div>
        <div class="max-w-screen-xl mx-auto p-5">
        </div>
      </section>

      <hr />
<!--      <section-->
<!--        v-for="component in components" v-bind:key="component.name"-->
<!--        :id="component.name"-->
<!--        :class="`w-full md:py-14 py-14 md:bg-cover md:bg-center bg-contain border-t bg-fixed bg-no-repeat bg-center justify-center ${component.bg_class}`"-->
<!--      >-->
<!--        <div v-if="component.title" class="container flex items-center justify-center mx-auto">-->
<!--          <div class="bg-white hover:bg-zinc-400 transition duration-300 shadow-xl rounded-xl p-4 text-center md:p-6 my-8" >-->
<!--            <h3 class="text-4xl uppercase">{{ component.title }}</h3>-->
<!--          </div>-->
<!--        </div>-->
<!--        <Component :is="getComponent(component.name)" :data="component.data" />-->
<!--      </section>-->

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