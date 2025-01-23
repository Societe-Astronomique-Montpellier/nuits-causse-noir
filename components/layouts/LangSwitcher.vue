<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

// Assuming that locales.value is an array of objects with a 'code' property
const isLanguageOpen: Ref<boolean> = ref(false);

// Now, you can use these types in your computed property
const availableLocales = computed(() =>
  locales.value.filter(i => i.code !== locale.value)
);

const switchLanguage = async (newLocale: any) => {
  setLocale(newLocale.code);
  locale.value = newLocale;
  isLanguageOpen.value = !isLanguageOpen.value;
}
</script>

<template>
  <div class="hidden md:flex items-center relative">
    <button
      class="flex items-center space-x-2 text-zinc-400 hover:text-green-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
      @click="isLanguageOpen = !isLanguageOpen"
    >
      <Icon name="material-symbols-light:language" size="32" />
      <span class="mr-2">{{ locales.find((i: any) => i.code === locale).flag }}</span>
    </button>

    <div v-if="isLanguageOpen" class="absolute right-0 mt-32 w-48 rounded-md shadow-lg bg-zinc-800 ring-1 ring-black ring-opacity-5">
      <div class="py-1" role="menu" aria-orientation="vertical">
        <button
          v-for="otherLocale in availableLocales"
          class="w-full text-left px-4 py-2 text-large text-zinc-300 hover:bg-green-500 hover:text-gray-900 transition-colors duration-200"
          role="menuitem"
          @click="switchLanguage(otherLocale)"
        >
          <span class="mr-2">
            {{ otherLocale.flag }} {{ otherLocale.name }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>