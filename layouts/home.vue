<script setup lang="ts">

const BackToTop =  defineAsyncComponent(() => import( "@/components/layouts/BackToTop.vue"));
</script>

<template>
  <div>
    <header></header>
    <div class="flex-fill">
      <slot />
    </div>
    <BackToTop />
    <footer></footer>
  </div>
</template>

<style scoped>

</style>