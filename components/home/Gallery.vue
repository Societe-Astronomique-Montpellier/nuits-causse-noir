<script setup lang="ts">
const props = defineProps<{
  data: any
}>();
const { data } = toRefs(props);

const ExpandableGalleryComponent = defineAsyncComponent(() => import('~/components/layouts/ExpandableGallery.vue'));
const YoutubeComponent = defineAsyncComponent(() => import('@/components/layouts/YoutubeVideo.vue'))
</script>

<template>
  <div class="max-w-screen-xl mx-auto p-5">
    <ExpandableGalleryComponent
      v-if="data.images"
      :images="data.images"
      class="p-4"
    />

    <youtube-component v-if="null !== data.youtubeVideoId" :youtubeId="data.youtubeVideoId" />
  </div>
</template>

<style scoped>

</style>