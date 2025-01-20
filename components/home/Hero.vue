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

const classCssTitle = computed<string>(() => (isMobile ? `text-4xl py-4 text-center ` : `py-16 text-6xl `) + ` font-extralight text-neutral-200`);
const classCssSubTitle = computed<string>(() => (isMobile ? `py-2 px-2 text-2xl text-justify ` : `px-64 text-3xl text-center `) + ` font-extralight text-neutral-200`);
</script>

<template>
  <div class="flex h-screen w-full">
    <div class="bg-hero bg-cover bg-center bg-no-repeat absolute inset-0 flex flex-col items-center">
      <prismic-image
          v-if="isFilled.image(logo)"
          :field="logo"
          :class="isMobile ? `w-500` : `w-50 flex`"
          class="relative items-center justify-center"
          :alt="titleHero"
      ></prismic-image>
      <h2 :class="classCssTitle">{{ rangeDates }}</h2>
      <div v-if="!isMobile" :class="classCssSubTitle">{{ subtitle }}</div>
      <div
          :class="isMobile ? `flex flex-col space-y-4 mx-2` : `inline-flex flex-row space-x-16 my-16`"
          class=""
          v-if="isOpen"
      >
        <button
          class="py-4 px-12 bg-zinc-800 border-solid border-2 border-green-500 text-white rounded-2xl font-bold text-2xl inline-flex items-center"
          role="link"
        >
          <Icon name="material-symbols-light:euro" size="32" class="text-white" />
          <span><a href="#tarifs">Tarifs</a></span>
        </button>

        <button
            class="py-4 px-12 bg-zinc-800 border-solid border-2 border-green-500 text-white rounded-2xl font-bold text-2xl inline-flex items-center"
            role="link"
        >
          <Icon name="mdi-light:calendar" size="32" class="text-white" />
          <span><a href="#programme">Programme</a></span>
        </button>

        <prismic-link
          v-if="asLink(subscribeLink)"
          :field="subscribeLink"
          role="button"
          class="py-4 px-12 bg-green-500 text-white rounded-2xl font-bold text-2xl"
        ></prismic-link>

<!--        <div id="section05" class="demo">-->
<!--          <a href="#programme">Programme<span class="text-zinc-400"></span></a>-->
<!--        </div>-->
      </div>
      <div v-else-if="!isOpen">
        <button
          class="w-fit py-4 px-12 bg-zinc-800 border-solid border-2 border-green-500 text-white rounded-2xl font-bold text-2xl"
          role="link"
        >
          Ouverture prochainement de la billeterie
        </button>
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