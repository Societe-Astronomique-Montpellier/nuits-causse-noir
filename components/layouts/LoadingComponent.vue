<script setup lang="ts">

</script>

<template>
  <div class="flex flex-col  items-center justify-center min-h-screen">
    <div class="relative">
      <div class="relative w-32 h-32">
        <div
            class="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-r-[#43A047] border-b-[#00ff0d] animate-spin"
            style="animation-duration: 3s;"
        ></div>

        <div
            class="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-t-[#43A047] animate-spin"
            style="animation-duration: 2s; animation-direction: reverse;"
        ></div>
      </div>

      <div
          class="absolute inset-0 bg-gradient-to-tr from-[#0ff]/10 via-transparent to-[#0ff]/5 animate-pulse rounded-full blur-sm"
      ></div>
      <div class="mt-4 text-center">
        <p class="text-zinc-200 text-lg">{{ $t('layout.please_wait') }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>