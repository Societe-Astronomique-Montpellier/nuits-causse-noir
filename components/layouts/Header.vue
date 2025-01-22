<script setup lang="ts">

const { t } = useI18n();

const menuItems = reactive([
  { label: t('homepage.blocks.hero.label_tarif'), href: "#tarifs" },
  { label: t('homepage.blocks.program.label_tarif'), href: "#programme" },
  { label: t('homepage.blocks.place.label_tarif'), href: "#place" },
  { label: t('homepage.blocks.contact.label_tarif'), href: "#contact" },
])
</script>

<template>
  <header
    class="fixed top-0 w-full z-50 bg-zinc-800 bg-opacity-70 backdrop-filter backdrop-blur-lg shadow-lg"
  >
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div
        class="flex items-center justify-between h-16"
      >

        <!-- logo -->
        <div class="flex-shrink-0 flex items-center">
          <NuxtImg
            class="h-8 w-auto"
            src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9"
            alts="Logo"
          />
        </div>

        <!-- items -->
        <nav class="hidden md:flex space-x-8">
          <NuxtLink v-for="item in menuItems"  :to="item.href" class="text-zinc-300 hover:text-green-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
            {{ item.label}}
          </NuxtLink>
        </nav>

        <!-- language switcher -->

      </div>
    </div>
  </header>
</template>

<style scoped>

</style>

<!-- https://purecode.ai/generations/7332c5d8-dd30-40fe-82ee-3e423d223aeb/0