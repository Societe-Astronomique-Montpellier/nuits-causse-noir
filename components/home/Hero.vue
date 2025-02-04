<script setup lang="ts">
import type {DateField, ImageField, KeyTextField} from "@prismicio/client";
import type {ComputedRef} from "vue";
import { isFilled } from "@prismicio/helpers";

const { t, locale } = useI18n();
const { isMobile } = useDevice();
// const AuroraBackground = defineAsyncComponent(() => import('~/components/AuroraBackground.vue'))

const props = defineProps<{
  isOpen: boolean,
  titleHero: KeyTextField | undefined,
  subtitle: KeyTextField | undefined,
  dateStart: DateField | undefined,
  dateEnd: DateField | undefined,
  logo: ImageField<never>
}>();
const { titleHero, subtitle, dateStart, dateEnd } = toRefs(props);

const rangeDates: ComputedRef<string> = computed<string>(() => t('homepage.blocks.hero.date', {
  dateStart: useFormatIntoFrenchDate(dateStart.value, "short", locale.value),
  dateEnd: useFormatIntoFrenchDate(dateEnd.value, "short", locale.value)
}));

const classCssTitle = computed<string>(() => (isMobile ? `text-4xl ` : `text-6xl `) + ` font-extralight text-neutral-100`);
const classCssSubTitle = computed<string>(() => (isMobile ? `text-2xl ` : `text-3xl max-w-10xl `) + ` mx-auto font-extralight text-neutral-100`);
</script>

<template>
  <div class="relative h-screen w-full overflow-hidden">
    <div class="bg-hero absolute inset-0 bg-cover bg-center bg-no-repeat" role="img" :aria-label="t('layout.title')">

      <div class="relative h-full flex items-center justify-center">
        <div class="container mx-auto px-4 text-center">
          <div
            class="max-w-4xl mx-auto transform transition-all duration-500 space-y-8"
            :style="{ opacity: isOpen ? 1 : 0, transform: isOpen ? 'translateY(0)' : 'translateY(20px)' }"
          >
            <h1 :title="t('layout.title')">
              <prismic-image
                  v-if="isFilled.image(logo)"
                  :field="logo"
                  :class="isMobile ? `w-500` : `mx-auto w-large`"
                  :alt="titleHero"
                  fetchpriority="high"
              />
            </h1>
            <h2 v-if="isOpen" :class="classCssTitle">{{ rangeDates }}</h2>

            <div v-if="!isMobile" :class="classCssSubTitle">{{ subtitle }}</div>

            <div class="mt-8">
              <slot name="subscribe" />
            </div>
        </div>
      </div>
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

section {
  position: relative;
  width: 100%;
  height: 100%;
}
section::after {
  position: absolute;
  bottom: 0;
  left: 0;
  content: '';
  width: 100%;
  height: 80%;
  background: -webkit-linear-gradient(top,rgba(0,0,0,0) 0,rgba(0,0,0,.8) 80%,rgba(0,0,0,.8) 100%);
  background: linear-gradient(to bottom,rgba(0,0,0,0) 0,rgba(0,0,0,.8) 80%,rgba(0,0,0,.8) 100%);
}

.demo a {
  position: absolute;
  bottom: 20px;
  left: 50%;
  z-index: 2;
  display: inline-block;
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
  color: #fff;
  font : normal 400 20px/1 'Josefin Sans', sans-serif;
  letter-spacing: .1em;
  text-decoration: none;
  transition: opacity .3s;
}
.demo a:hover {
  opacity: .5;
}


#section05 a {
  padding-top: 70px;
}
#section05 a span {
  position: absolute;
  top: 0;
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