<script setup lang="ts">
import type {AllDocumentTypes, EventDocument, HomepageDocument, RateDocument, } from "~/prismicio-types";
import {isFilled, asLink, asImageSrc} from "@prismicio/helpers";
import {type ImageField, type LinkField, type RichTextField} from "@prismicio/client";
import type {ComputedRef} from "vue";
import {LinkType} from "@prismicio/types";

/**
 * Composables
 */
const { locale, locales, t } = useI18n();
const prismic = usePrismic();
// const { getComponent } = useDynamicComponent();

definePageMeta({
  layout: "home",
});

/**
 * Query
 */
const prismicFetchData = async() => {
  const currentLang = locales.value.find(l => l.code === locale.value)?.iso ?? "fr-FR";
  const [homepage, rates, events] = await Promise.all([
    (
      await prismic.client.getSingle("homepage", {
        lang: currentLang
      }) as HomepageDocument
    ),
    (
      await prismic.client.getAllByType<AllDocumentTypes>("rate", {
        lang: currentLang,
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
        lang: currentLang,
        orderings: {
          field: 'my.event.date_event',
        }
      }) as EventDocument[]
    )
  ]);

  return { homepage, rates, events }
};
const { data, status } = await useAsyncData('data', prismicFetchData, { watch: [locale]});

const LoadingComponent = defineAsyncComponent(() => import('@/components/layouts/LoadingComponent.vue'));
const Hero = defineAsyncComponent(() => import('@/components/home/Hero.vue'))
const TitleSectionHome = defineAsyncComponent(() => import('@/components/layouts/TitleSectionHome.vue'));
const Description = defineAsyncComponent(() => import('@/components/home/Description.vue'));
const Rates = defineAsyncComponent(() => import('@/components/home/Rates.vue'));
const Program = defineAsyncComponent(() => import('@/components/home/Program.vue'));
const Place = defineAsyncComponent(() => import('@/components/home/Place.vue'));
const Gallery = defineAsyncComponent(() => import('@/components/home/Gallery.vue'))
const ContactForm = defineAsyncComponent(() => import('@/components/home/ContactForm.vue'));

// Description component
const description: ComputedRef<RichTextField | undefined> = computed<RichTextField | undefined>(() => data.value?.homepage.data.description)
const optimizedImage: ComputedRef<ImageField<never> | undefined> = computed<ImageField<never> | undefined>(() => data?.value?.homepage.data.image_description);

// Rates component
const gridRatesNumber: ComputedRef<number> = computed<number>(() => (0 === 2 % (data.value?.rates?.length ?? 0)) ? 2: 3);

// Program component
type GroupedByDay = Record<string, EventDocument[]>;
const groupedByDay: ComputedRef<GroupedByDay | undefined> = computed<GroupedByDay | undefined>(() => useGroupEvents(data?.value?.events));

// Place component
const pradinesCoordinates: ComputedRef<[number, number]> = computed<[number, number]>(() => [data.value?.homepage.data.place_coords.latitude as number, data.value?.homepage.data.place_coords.longitude as number]);

// Gallery component
const images: ComputedRef<ImageField[] | undefined> = computed<ImageField[] | undefined>(() => data.value?.homepage.data.gallery.map(image => image.image as ImageField));
const youtubeVideoId: ComputedRef<string | null> = computed<string | null>(() => {
  const youtubeLinkField: LinkField | undefined = data.value?.homepage.data.youtube_link;
  if (isFilled.link(youtubeLinkField) && youtubeLinkField.link_type === LinkType.Web) {
    const youtubeLink = asLink(youtubeLinkField) as string;
    return (new URL(youtubeLink).searchParams.get("v"));
  }

  return null;
});

interface IComponent {
  name: string | undefined,
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
    title: t('homepage.blocks.rates.title'),
    bg_class: "bg-rates",
    data: {gridRatesNumber: gridRatesNumber, listRates: data.value?.rates}
  },
  {
    name: "program",
    title: t('homepage.blocks.program.title'),
    bg_class: "bg-program",
    data: {events: groupedByDay}
  },
  {
    name: "place",
    title: t('homepage.blocks.place.title'),
    bg_class: "bg-place",
    data: {title: data.value?.homepage.data.place_name, coordinate: pradinesCoordinates}
   },
   {
    name: "gallery",
    title: t('homepage.blocks.gallery.title'),
    bg_class: "bg-gallery",
    data: { images: images, youtubeVideoId: youtubeVideoId}
   },
   {
     name: "contact",
     title: t('homepage.blocks.contact.title'),
     bg_class: "bg-contact",
     data: {}
   }
]);

/**
 * SEO
 */
const metaTitle: ComputedRef<string> = computed<string>(() => isFilled.keyText(data.value?.homepage.data.meta_title) ? `${data.value?.homepage.data.meta_title}`: `${data.value?.homepage.data.title}`);
const metaDesc: ComputedRef<string> = computed<string>(() => isFilled.keyText(data.value?.homepage.data.meta_description) ? `${data.value?.homepage.data.meta_description}`: `${data.value?.homepage.data.subtitle}`);
const metaImg: ComputedRef<ImageField<never> | undefined> = computed<ImageField<never> | undefined>(() => isFilled.image(data.value?.homepage.data.meta_image) ? data.value?.homepage.data.meta_image.thumbs : data.value?.homepage.data.logo)

useSeo({
  title: metaTitle,
  description: metaDesc,
  image: asImageSrc(metaImg.value)
});
</script>

<template>
  <LoadingComponent v-if="status === 'pending'" />
  <div v-else-if="status === 'success' && data">
    <Hero
      :isOpen="data?.homepage.data.enable_site"
      :title-hero="data?.homepage.data.title"
      :subtitle="data?.homepage.data.subtitle"
      :date-start="data?.homepage.data.date_start"
      :date-end="data?.homepage.data.date_end"
      :logo="data?.homepage.data.logo"
      :subscribe-link="data?.homepage.data.subscribe_link"
    >
      <template #subscribe>
        <prismic-link
          v-if="asLink(data?.homepage.data.subscribe_link) && data.homepage.data.enable_site"
          :field="data?.homepage.data.subscribe_link"
          role="link"
          class="
            group inline-flex items-center px-8 py-4 rounded-full
            text-lg font-semibold
            text-neutral-100 bg-green-700
            hover:bg-zinc-800 hover:border-green-500 hover:border-2
            transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-black"
          :title="data?.homepage.data.subscribe_link.text"
        >
          {{ data?.homepage.data.subscribe_link.text }}
          <Icon name="material-symbols-light:arrow-right-alt-rounded" size="32" />
        </prismic-link>
        <button
          v-if="!data.homepage.data.enable_site"
          class="group inline-flex items-center px-8 py-4 text-lg font-semibold text-neutral-100 bg-green-500 rounded-full transition-all duration-300 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-black"
          role="link"
        >
          {{ $t('homepage.blocks.hero.site_closed') }}
        </button>
      </template>
    </Hero>

    <div v-if="data.homepage.data.enable_site">
      <section
        id="description"
        class="w-full md:py-14 sm:py-8 bg-cover bg-center border-t bg-fixed bg-no-repeat justify-center"
      >
        <Description :data="{text: description, image: optimizedImage}" />
      </section>

      <section
        id="tarifs"
        class="w-full md:py-14 sm:py-8 bg-cover bg-center border-t bg-fixed bg-no-repeat justify-center bg-rates"
      >
        <TitleSectionHome :title="components.filter(item => item.name === 'rates')[0].title" customClass="" />
        <Rates :data="{gridRatesNumber: gridRatesNumber, listRates: data.rates}" />
      </section>

      <section
        id="programme"
        class="w-full md:py-14 sm:py-8 bg-cover bg-center border-t bg-fixed bg-no-repeat justify-center bg-program"
      >
        <TitleSectionHome :title="components.filter(item => item.name === 'program')[0].title" customClass="" />
        <Program :data="{events: groupedByDay}" />
      </section>

      <section
        id="place"
        class="w-full md:py-14 sm:py-8 bg-cover bg-center border-t bg-fixed bg-no-repeat justify-center bg-place"
      >
        <TitleSectionHome :title="components.filter(item => item.name === 'place')[0].title" customClass="" />
        <Place :data="{title: data.homepage.data.place_name, coordinate: pradinesCoordinates}" />
      </section>


      <section
        id="galery"
        class="w-full md:py-14 sm:py-8 bg-cover bg-center border-t bg-fixed bg-no-repeat justify-center bg-gallery"
      >
        <TitleSectionHome :title="components.filter(item => item.name === 'gallery')[0].title" customClass="" />
        <Gallery :data="{ images: images, youtubeVideoId: youtubeVideoId }" />
      </section>

      <section
        id="contact"
        class="w-full md:py-14 sm:py-8 bg-cover bg-center border-t bg-fixed bg-no-repeat justify-center bg-contact"
      >
        <TitleSectionHome :title="components.filter(item => item.name === 'contact')[0].title" customClass="" />
        <ContactForm />
      </section>

      <hr />
<!--      <section-->
<!--        v-for="component in components" v-bind:key="component.name"-->
<!--        :id="component.name"-->
<!--        :class="`w-full md:py-14 sm:py-8 md:bg-cover md:bg-center bg-contain border-t bg-fixed bg-no-repeat bg-center justify-center ${component.bg_class}`"-->
<!--      >-->
<!--      <TitleSectionHome v-if="component.title" :title="component.title" customClass="" />-->
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

.bg-contact {
  background-image: url("/img/bkg6_2000.jpg");
}
</style>