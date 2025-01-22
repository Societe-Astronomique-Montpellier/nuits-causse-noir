<script setup lang="ts">
import type { ComputedRef, Ref } from "vue";

const { locale, locales, setLocale } = useI18n()

// Assuming that locales.value is an array of objects with a 'code' property

// Now, you can use these types in your computed property
const availableLocales = computed(() =>
  locales.value.filter(i => i.code !== locale.value)
);

const switchLanguage = async (newLocale: any) => {
  setLocale(newLocale.code);
  locale.value = newLocale;
}
</script>

<template>
  <NuxtLink v-for="locale in availableLocales" :key="locale.code" to="#" @click.prevent.stop="switchLanguage(locale)">
    {{ locale }}
  </NuxtLink>
</template>

<style scoped>

</style>