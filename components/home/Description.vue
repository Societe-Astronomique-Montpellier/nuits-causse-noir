<script setup lang="ts">
const ImageCopyright = defineAsyncComponent(() => import('@/components/layouts/imageCopyright.vue'))
const { isMobile } = useDevice();
const richTextSerializer = useRichTextSerializer();

const props = defineProps<{
  data: any
}>();
const { data } = toRefs(props);
</script>

<template>
  <div
    :class="isMobile ? `p-2` : `p-5`"
    class="max-w-screen-xl mx-auto"
  >
    <div class="grid max-w-screen-xl px-4 py-4 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
      <div class="mr-auto place-self-center lg:col-span-7">
        <prismic-rich-text
          :field="data.text"
          :serializer="richTextSerializer"
          class="max-w-2xl text-neutral-200 font-thin lg:mb-12 sm:mb-8"
          :class="isMobile ? `text-xl` : `text-lg`"
        />
      </div>
      <div class="lg:mt-0 lg:col-span-5 lg:flex sm:flex rounded-lg">
        <ImageCopyright :image="data.image" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>