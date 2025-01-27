<script setup lang="ts">
const { t } = useI18n();
const props = defineProps<{
  data: any
}>();
const { data } = toRefs(props);


const urlPradines: Ref<string> = ref('https://www.domaine-de-pradines.com/');
</script>

<template>
  <div class="max-w-screen-xl mx-auto p-5 wrapper antialiased text-gray-900">
    <div>
      <div class="relative px-4 ">
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h4 class="mt-1 text-xl font-semibold uppercase leading-tight truncate">{{ data.title }}</h4>

          <div class="border-green-500 border-4 rounded-xl my-4"><LMap
            style="height: 600px"
            :zoom="15"
            :center="data.coordinate"
            :use-global-leaflet="false"
          >
            <LTileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            a ttribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
              layer-type="base"
              name="OpenStreetMap"
            />
            <LMarker :lat-lng="data.coordinate" />
          </LMap></div>

          <div class="mt-4 flex-inline items-center justify-center">
            <NuxtLink
              type="button"
              :to="urlPradines"
              :title="t('homepage.blocks.place.website_title')"
              target="_blank"
              class="
                text-neutral-100 bg-green-700
                hover:bg-zinc-800 hover:border-green-500 hover:border-2
                transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-black
                px-8 py-4 rounded-full font-bold
            ">
              {{ $t('homepage.blocks.place.website') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>