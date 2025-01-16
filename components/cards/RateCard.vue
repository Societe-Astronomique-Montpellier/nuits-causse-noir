<script setup lang="ts">
import type { RateDocumentData } from "~/prismicio-types";

const props = defineProps<{ rate: RateDocumentData }>();
const { rate } = toRefs(props)
</script>

<template>
<!--  <div class="bg-white rounded-lg shadow-lg p-4">-->
<!--    <div class="relative overflow-hidden">-->
<!--      <prismic-image :field="rate.image" class="object-cover w-full h-full" />-->
<!--      <div class="absolute inset-0 bg-black opacity-40"></div>-->
<!--    </div>-->
<!--    <h3 class="text-xl font-bold text-gray-900 mt-4">{{ rate.title }}</h3>-->
<!--    <p v-if="rate.description" class="text-gray-500 text-sm mt-2">{{ rate.description }}</p>-->
<!--    <p v-if="rate.camping" class="text-gray-500 text-sm mt-2">{{ rate.camping }}</p>-->
<!--    <div class="flex items-center justify-between mt-4">-->
<!--      <span class="text-gray-900 font-bold text-lg">Prix</span>-->
<!--      <button class="bg-green-500 text-neutral-200 py-2 px-12 rounded-full font-bold hover:bg-zinc-800">{{ rate.price }}&euro;</button>-->
<!--    </div>-->
<!--  </div>-->

  <div>
    <div class="block bg-zinc-800 rounded-lg p-4 shadow-sm shadow-zinc-700">
      <prismic-image :field="rate.image.vignette" class="rounded-md p-4 object-cover bg-zinc-400" :widths="[512, 248]" />
      <div class="mt-2 flex flex-items-center">

        <div class="mt-6 flex items-center gap-8 text-s flex-wrap">
          <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <Icon name="material-symbols-light:camping-outline-rounded" class="text-green-500" size="24" />
            <div class="mt-1.5 sm:mt-0">
              <p class="text-gray-400">{{ rate.description }}</p>
            </div>
          </div>

          <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <Icon name="material-symbols-light:sunny-outline" size="24" class="text-green-500" />
            <div class="mt-1.5 sm:mt-0">
              <p class="text-gray-400">Jours: <span class="font-medium">{{ rate.days }}</span></p>
            </div>
          </div>

          <div class="inline-flex sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <Icon name="material-symbols-light:clear-night" size="24" class="text-red-950" />
            <div class="mt-1.5 sm:mt-0">
              <p class="text-gray-400">Nuits: <span class="font-medium">{{ rate.nights }}</span></p>
            </div>
          </div>

          <div class="inline-flex sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <button class="bg-green-500 text-neutral-200 py-2 px-12 rounded-full font-bold hover:bg-zinc-800 hover:border-green-500 hover:border-2">{{ rate.price }}&euro;</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>