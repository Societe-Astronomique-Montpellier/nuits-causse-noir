<script setup lang="ts">
const props = defineProps<{ title: string | undefined, customClass: string | undefined | null}>();
const { title } = toRefs(props)
</script>

<template>
  <div class="container flex items-center justify-center mx-auto">
    <div :class="`bg-white hover:bg-zinc-400 transition duration-300 shadow-xl rounded-xl p-4 text-center md:p-6 my-8 ${customClass}`">
      <h3 class="text-4xl uppercase">{{ title }}</h3>
    </div>
  </div>
</template>

<style scoped>

</style>