<script setup lang="ts">
const BackToTop =  defineAsyncComponent(() => import( "@/components/layouts/BackToTop.vue"));
const Footer = defineAsyncComponent(() => import('@/components/layouts/Footer.vue'))
</script>

<template>
  <div>
    <div class="flex-fill">
      <slot />
    </div>
    <BackToTop />
    <Footer></Footer>
  </div>
</template>

<style scoped>

</style>