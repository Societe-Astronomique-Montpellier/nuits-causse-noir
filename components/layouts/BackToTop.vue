<script setup lang="ts">
const { t } = useI18n();
const isVisible: Ref<boolean> = ref(false);
const iconSize: Ref<number> = ref(20);
// const iconSizeMobile: Ref<number> = ref(16);

onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));

const displayBtn = computed<string>(() => isVisible.value ? "visible" : "hidden");

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
const handleScroll = () => (isVisible.value = window.scrollY > 200);
</script>

<template>
  <button
    :class="`fixed bottom-4 right-4 rounded-md aspect-square min-h-[32px] bg-transparent text-white border-2 border-green-500 px-4 py-2 shadow-lg hover:bg-white hover:text-green-500 focus:outline-none focus:ring focus:ring-green-300 ${displayBtn}`"
    type="button"
    :aria-label="t('layout.backToTop')"
    @click="scrollToTop"
    :title="t('layout.backToTop')"
  >
    <Icon name="material-symbols:arrow-upward" :size="iconSize" class="text-green-500" />
  </button>
</template>

<style scoped>

</style>