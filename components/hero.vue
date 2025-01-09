<script setup lang="ts">
import type {DateField, ImageField, KeyTextField, LinkField} from "@prismicio/client";
import type {ComputedRef} from "vue";
import { isFilled } from "@prismicio/helpers";

const { t } = useI18n();
const AuroraBackground = defineAsyncComponent(() => import('@/components/AuroraBackground.vue'))

const props = defineProps<{
  titleHero: KeyTextField | undefined,
  subtitle: KeyTextField | undefined,
  dateStart: DateField | undefined,
  dateEnd: DateField | undefined,
  logo: ImageField<never>
  subscribeLink: LinkField
}>();
const { titleHero, subtitle, dateStart, dateEnd, subscribeLink } = toRefs(props);

const rangeDates: ComputedRef<string> = computed<string>(() => `Du ${useFormatIntoFrenchDate(dateStart.value, "short")} au ${useFormatIntoFrenchDate(dateEnd.value, "short")}`);
</script>

<template>
  <AuroraBackground>
    <div
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :visible="{
        opacity: 1,
        y: 0,
        transition: {
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut',
        },
      }"
        class="relative flex flex-col items-center justify-center gap-16 px-8"
    >
      <prismic-image
        v-if="isFilled.image(logo)"
        :field="logo"
        class="w-72 relative flex flex-col items-center justify-center"
        :alt="titleHero"
      ></prismic-image>
      <h2 class="py-8 text-base font-extralight md:text-4xl text-neutral-200">
        {{ rangeDates }}
      </h2>
      <div class="py-8 text-base font-extralight md:text-3xl text-neutral-200">
        {{ subtitle }}
      </div>
      <div class="inline-flex gap-24 my-16 md:flex-row">
        <button
          class="w-fit py-4 px-12 bg-zinc-800 border-solid border-2 border-green-500 text-white rounded-full font-bold text-2xl"
          role="link"
        >
          <a href="#tarifs">Tarifs & programme</a>
        </button>

        <prismic-link
          :field="subscribeLink"
          role="button"
          class="w-fit py-4 px-12 bg-green-500 text-white rounded-full font-bold text-2xl"
        ></prismic-link>
      </div>

    </div>
  </AuroraBackground>
</template>
