<script setup lang="ts">
const Header = defineAsyncComponent(() => import('@/components/layouts/Header.vue'));
const BackToTop =  defineAsyncComponent(() => import( "@/components/layouts/BackToTop.vue"));
const Footer = defineAsyncComponent(() => import('@/components/layouts/Footer.vue'))
</script>

<template>
  <div>
    <Header />
    <div class="flex-fill">
      <slot />
    </div>
    <BackToTop />
    <Footer></Footer>
  </div>
</template>

<style scoped>

</style>