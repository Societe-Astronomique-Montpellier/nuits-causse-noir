<script setup lang="ts">
import type {DateField, ImageField, KeyTextField} from "@prismicio/client";
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
  subscribeLink: string
}>();
const { titleHero, subtitle, dateStart, dateEnd, subscribeLink } = toRefs(props);

const rangeDates: ComputedRef<string> = computed<string>(() => `Du ${dateStart.value} au ${dateEnd.value}`);
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
        class="relative flex flex-col items-center justify-center gap-4 px-4"
    >
<!--      <h1 class="text-center text-3xl font-bold md:text-7xl text-white">-->
<!--        {{ titleHero }}-->
<!--      </h1>-->
      <prismic-image
        v-if="isFilled.image(logo)"
        :field="logo"
        class="w-72 relative flex flex-col items-center justify-center"

      ></prismic-image>
      <h2 class="py-4 text-base font-extralight md:text-4xl text-neutral-200">
        {{ rangeDates }}
      </h2>
      <div class="py-4 text-base font-extralight md:text-3xl text-neutral-200">
        {{ subtitle }}
      </div>
      <div class="inline-flex gap-10 my-5 md:flex-row">
        <button
            class="w-fit py-4 px-12 bg-green-500 text-white rounded-full font-bold "
        >
          <nuxt-link
              class="text-2xl hover:text-4xl"
          >
            Inscription
          </nuxt-link>

        </button>

        <button
          class="w-fit py-4 px-12 bg-zinc-800 border-solid border-2 border-green-500 text-white rounded-full font-bold text-2xl"
        >
          Tarifs & programme
        </button>
      </div>

    </div>
  </AuroraBackground>
</template>
