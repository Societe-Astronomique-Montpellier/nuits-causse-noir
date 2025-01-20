<script setup lang="ts">
const year: Ref<number> = ref(new Date().getFullYear());
</script>

<template>
  <footer class="text-center bg-neutral-700 dark:bg-neutral-700 lg:text-left">
    <div
        class="bg-black/5 p-4 text-center text-surface text-white dark:text-neutral-300"
    >
      © {{ year }}&nbsp;-&nbsp;Société Astronomique de Montpellier&nbsp;-&nbsp;Tout droit réservé
    </div>
  </footer>
</template>

<style scoped>

</style>