<script setup lang="ts">
import type { RateDocumentData } from "~/prismicio-types";
const { t } = useI18n();

const props = defineProps<{ rate: RateDocumentData }>();
const { rate } = toRefs(props)
</script>

<template>
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
              <p class="text-gray-400">{{ $t('homepage.blocks.rates.count_days') }}: <span class="font-medium">{{ rate.days }}</span></p>
            </div>
          </div>

          <div class="inline-flex sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <Icon name="material-symbols-light:clear-night" size="24" class="text-red-950" />
            <div class="mt-1.5 sm:mt-0">
              <p class="text-gray-400">{{ $t('homepage.blocks.rates.count_nights') }}: <span class="font-medium">{{ rate.nights }}</span></p>
            </div>
          </div>

          <div class="inline-flex sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <button class="
                text-neutral-100 bg-green-700
                hover:bg-zinc-800 hover:border-green-500 hover:border-2
                transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-black
               py-2 px-12 rounded-full font-bold
            ">{{ rate.price }}&euro;</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>