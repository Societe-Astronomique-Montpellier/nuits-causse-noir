<script setup lang="ts">
import type {RateDocument, RateDocumentData} from "~/prismicio-types";

const props = defineProps<{ rate: RateDocumentData }>();
const { rate } = toRefs(props)
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-4">
    <div class="relative overflow-hidden">
      <prismic-image :field="rate.image" class="object-cover w-full h-full" />
      <div class="absolute inset-0 bg-black opacity-40"></div>
    </div>
    <h3 class="text-xl font-bold text-gray-900 mt-4">{{ rate.title }}</h3>
    <p class="text-gray-500 text-sm mt-2">{{ rate.description }}</p>
    <p class="text-gray-500 text-sm mt-2">{{ rate.camping }}</p>
    <div class="flex items-center justify-between mt-4">
      <span class="text-gray-900 font-bold text-lg">Prix</span>
      <button class="bg-green-500 text-white py-2 px-12 rounded-full font-bold hover:bg-zinc-800">{{ rate.price }}&euro;</button>
    </div>
  </div>
</template>

<style scoped>

</style>