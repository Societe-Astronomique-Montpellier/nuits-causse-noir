<script setup lang="ts">
const year: Ref<number> = ref(new Date().getFullYear());
const urlSam: Ref<URL> = ref(new URL('https://www.societe-astronomique-montpellier.fr'));
</script>

<template>
  <footer class="text-center bg-neutral-700 dark:bg-neutral-700 lg:text-left">
    <div
      class="bg-black/5 p-4 text-center text-surface text-white dark:text-neutral-300"
    >
      <span class="px-1">© {{ year }}</span>
      &mdash;
      <NuxtLink
        :to="urlSam?.href"
        target="_blank"
        class="px-1 decoration-none  hover:text-green-500 hover:underline"
      >
        Société Astronomique de Montpellier
      </NuxtLink>
      &mdash;
      <span class="px-1">{{ $t('layout.copyright') }}</span>
    </div>
  </footer>
</template>

<style scoped>

</style>