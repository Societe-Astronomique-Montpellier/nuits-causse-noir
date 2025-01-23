<script setup lang="ts">
// https://purecode.ai/generations/7332c5d8-dd30-40fe-82ee-3e423d223aeb/0
const { t } = useI18n();
const { isMobile } = useDevice();

const isMenuOpen: Ref<boolean> = ref(false);

interface IMenu {
  label: string;
  href: string;
}
const menuItems: IMenu[] = reactive([
  { label: t('homepage.blocks.hero.title'), href: "#tarifs" },
  { label: t('homepage.blocks.program.title'), href: "#programme" },
  { label: t('homepage.blocks.place.title'), href: "#place" },
  { label: t('homepage.blocks.contact.title'), href: "#contact" },
]);

const LanguageSwitcher = defineAsyncComponent(() => import('@/components/layouts/LangSwitcher.vue'));
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
            class="bg-zinc-800 rounded-full h-16 w-auto object-fill"
            src="/img/LOGO_NCN_NOIR.png"
            alts="Logo"
          />
        </div>

        <!-- items -->
        <nav class="hidden md:flex space-x-8">
          <NuxtLink
            v-for="item in menuItems"
            :to="item.href"
            class="text-zinc-300 hover:text-green-500 px-3 py-2 rounded-md text-xl font-medium transition-colors duration-200 "
          >
            {{ item.label}}
          </NuxtLink>
        </nav>

        <!-- language switcher -->
        <LanguageSwitcher />

        <!-- Mobile menu button -->
        <div
          v-if="isMobile"
          class="md:hidden flex items-center bg-zinc-800"
        >
          <button
            class="inline-flex items-center justify-center p-2 rounded-md bg-zinc-800 hover:text-green-500  transition-colors duration-200"
            aria-expanded="false"
            @click="isMenuOpen = !isMenuOpen"
          >
            <span class="sr-only">Open main menu</span>
            <Icon :name="isMenuOpen ? `material-symbols-light:menu-open`: `material-symbols-light:arrow-menu-close`" class="block h-6 w-6 bg-gray-300"  aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div class="md:hidden" v-if="isMobile && isMenuOpen">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-zinc-800">
        <NuxtLink
          v-for="item in menuItems"
          :to="item.href"
          class="block px-3 py-2 rounded-md text-base font-medium text-zinc-200 hover:text-green-500 hover:bg-gray-100 transition-colors duration-200"
        >
          {{ item.label}}
        </NuxtLink>

        <div class="border-t border-gray-200 pt-4" v-show="false">
          <div class="px-3 py-2">
            <p class="text-base font-medium text-gray-400">Languages</p>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>

</style>

