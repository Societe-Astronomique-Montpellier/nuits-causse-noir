<script setup lang="ts">
// https://purecode.ai/generations/7332c5d8-dd30-40fe-82ee-3e423d223aeb/0
const { t, locale } = useI18n();
const localePath = useLocalePath();
const { isMobile } = useDevice();

const isMenuOpen: Ref<boolean> = ref(false);

interface IMenu {
  label: string;
  href: string;
}
const menuItems: IMenu[] = reactive([
  { label: 'homepage.blocks.hero.title', href: "#tarifs" },
  { label: 'homepage.blocks.program.title', href: "#programme" },
  { label: 'homepage.blocks.place.title', href: "#place" },
  { label: 'homepage.blocks.contact.title', href: "#contact" },
]);

const translatedMenuItems: ComputedRef<IMenu[]> = computed<IMenu[]>(() =>
    menuItems.map(item => ({
      label: t(item.label),
      href: item.href,
    }))
);

const LanguageSwitcher = defineAsyncComponent(() => import('@/components/layouts/LangSwitcher.vue'));
const logoAlt = `Logo ${t('layout.title')}`;
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
          <NuxtLink :to="localePath('/', locale)">
            <NuxtImg
              class="bg-zinc-200 rounded-full h-12 w-auto object-fill"
              src="/img/LOGO_NCN_NOIR.png"
              :alt=logoAlt
            />
          </NuxtLink>

        </div>

        <!-- items -->
        <nav class="hidden md:flex space-x-8">
          <NuxtLink
            v-for="(item, index) in translatedMenuItems"
            :key="index"
            :to="item.href"
            class="text-zinc-300 hover:text-green-500 px-3 py-2 rounded-md text-xl font-medium transition-colors duration-200 "
          >
            {{ item.label}}
          </NuxtLink>
        </nav>

        <!-- language switcher -->
        <LanguageSwitcher v-if="!isMobile" />

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
          v-for="(item, index) in translatedMenuItems"
          :key="index"
          :to="item?.href"
          class="block px-3 py-2 rounded-md text-base font-medium text-zinc-200 hover:text-green-500 hover:bg-gray-100 transition-colors duration-200"
        >
          {{ item.label}}
        </NuxtLink>

        <LanguageSwitcher v-if="isMobile" />
      </div>
    </div>
  </header>
</template>

<style scoped>

</style>

