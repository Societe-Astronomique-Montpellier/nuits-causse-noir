<script setup lang="ts">
import type {DateField, ImageField, KeyTextField, LinkField} from "@prismicio/client";
import type {ComputedRef} from "vue";
import {asLink, isFilled} from "@prismicio/helpers";

const { t } = useI18n();
const { isMobile } = useDevice();
const AuroraBackground = defineAsyncComponent(() => import('~/components/AuroraBackground.vue'))

const props = defineProps<{
  isOpen: boolean,
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
  <div class="flex h-screen w-full">
    <div class="flex-1 bg-hero bg-cover bg-center bg-no-repeat absolute inset-0 flex flex-col justify-center items-center">
      <prismic-image
          v-if="isFilled.image(logo)"
          :field="logo"
          :class="isMobile ? `w-500` : `w-100`"
          class="relative flex flex-col items-center justify-center"
          :alt="titleHero"
      ></prismic-image>
      <h2 class="md:py-16 sm:py-2 text-base md:font-extralight text-neutral-200"
      :class="isMobile ? `text-9xl` : `text-4xl`">
        {{ rangeDates }}
      </h2>
      <div class="md:py-8 md:px-64 sm:py-2 sm:px-8 text-base text-center font-extralight md:text-3xl sm:text-8xl text-neutral-200">
        {{ subtitle }}
      </div>
      <div
          :class="isMobile ? `gap-10 my-4` : `inline-flex flex-row gap-24 my-16`"
          class=""
          v-if="isOpen"
      >
        <button
          class="py-4 px-12 bg-zinc-800 border-solid border-2 border-green-500 text-white rounded-2xl font-bold text-2xl"
          role="link"
        >
          <a href="#tarifs">Tarifs & programme</a>
        </button>

<!--        <prismic-link-->
<!--          v-if="asLink(subscribeLink)"-->
<!--          :field="subscribeLink"-->
<!--          role="button"-->
<!--          class="py-4 px-12 bg-green-500 text-white rounded-2xl font-bold text-2xl"-->
<!--        ></prismic-link>-->
      </div>
      <div v-else-if="!isOpen">
        <button
          class="w-fit py-4 px-12 bg-zinc-800 border-solid border-2 border-green-500 text-white rounded-2xl font-bold text-2xl"
          role="link"
        >
          Ouverture prochainement de la billeterie
        </button>
      </div>

      <div id="section05" class="demo absolute bottom-2">
        <a href="#description"><span></span></a>
      </div>
    </div>
  </div>

  <!-- AuroraBackground>
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
        class="relative flex flex-col items-center align-middle h-screen p-32"
    >
    </div>
  </AuroraBackground -->
</template>
<style scoped>
.bg-hero {
  background-image: url('/img/Z4GXVpbqstJ99VN9_CielPradinesDickOR.avif')
}

#section05 a span {
  left: 50%;
  width: 24px;
  height: 24px;
  margin-left: -12px;
  border-left: 1px solid #fff;
  border-bottom: 1px solid #fff;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-animation: sdb05 1.5s infinite;
  animation: sdb05 1.5s infinite;
  box-sizing: border-box;
}
@-webkit-keyframes sdb05 {
  0% {
    -webkit-transform: rotate(-45deg) translate(0, 0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    -webkit-transform: rotate(-45deg) translate(-20px, 20px);
    opacity: 0;
  }
}
@keyframes sdb05 {
  0% {
    transform: rotate(-45deg) translate(0, 0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: rotate(-45deg) translate(-20px, 20px);
    opacity: 0;
  }
}
</style>