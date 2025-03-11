<script setup lang="ts">
const { t } = useI18n();
const { $apiFetch } = useNuxtApp();
const props = defineProps<{
  data: any
}>();
const { data } = toRefs(props);


interface GeoJSONFeature {
  type: string;
  geometry: {
    type: "Point" | "Polygon" | "LineString" | "MultiPolygon" | "MultiLineString" | "GeometryCollection"; // Specific types
    coordinates: any[];
  };
  properties: Record<string, any>;
}
interface GeoJSONFeatureCollection {
  type: string;
  features: GeoJSONFeature[];
}

interface GeoJsonObject {
  type: string;
  features: GeoJSONFeature[];
  geometry?: any;
  properties?: any;
}

const geoJsonData = ref(); //ref<GeoJsonObject | GeoJsonObject[] | undefined>(undefined);
onMounted(async() => {
  geoJsonData.value = await $apiFetch<GeoJSONFeatureCollection>('/geojson?file=data'); // as GeoJsonObject;
})

const geoJsonStyler = (feature: any) => {
  const zone = feature.properties.name;
  let color: string = '';
  let fillColor: string = '';
  let opacity: number = 1;
  let stroke: boolean = false;

  if ("observers" === zone) {
    color = "#96ffff"; // "#96ffff33";
    fillColor = "#25fde9"; // "#96ffff66";
    stroke = true;
  }
  if ("astrophotographs" === zone) {
    color = "#5c0a0a"; // "#6400004d";
    fillColor = "#800000"; // "#96000066";
    stroke = true;
  }

  return {
    color: color,
    fillColor: fillColor,
    stroke: stroke,
    fillOpacity: 0.6,
    opacity: opacity,
  };
};

interface IZone {
  name: string;
  label: string;
  color: string;
}
const listZones: IZone[] = reactive([
  {
    name: "observers",
    label: t('homepage.blocks.place.observers'),
    color: "#96ffff",
  },
  {
    name: "astrophotographs",
    label:  t('homepage.blocks.place.astrophotographs'),
    color: "#5c0a0a",
  },
])
const urlPradines: Ref<string> = ref('https://www.domaine-de-pradines.com/');
</script>

<template>
  <div class="max-w-screen-xl mx-auto md:p-5 sm:p-1 wrapper antialiased ">
    <div>
      <div class="relative px-4 ">
        <div class="bg-zinc-800 bg-opacity-90 md:p-2 sm:p-2 rounded-lg shadow-lg">
          <div class=" py-6 px-4 sm:px-6 lg:px-8">
            <div class="max-w-7xl mx-auto">
              <div class="flex flex-col lg:flex-row items-center justify-between gap-12">
                <div class="flex-1 text-center lg:text-left">
                  <h4 class="text-4xl md:text-5xl font-bold  text-zinc-400 leading-tight mb-6 animate-fade-in">
                    {{ data.title }}
                  </h4>
                  <div class="text-lg md:text-xl text-zinc-500 mb-8 max-w-2xl">
                    <div
                      v-for="zone in listZones"
                      :key="zone.name"
                      class="inline-flex items-center px-3"
                    >
                      <span
                        class="size-2 inline-block rounded-full me-2"
                        :style="{
                          backgroundColor: zone.color,
                        }"
                      ></span>
                      <span>{{ zone.label }}</span>
                    </div>
                  </div>
                  <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
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
                      px-8 py-4 rounded-lg font-semibold
                    ">
                      {{ $t('homepage.blocks.place.website') }}
                    </NuxtLink>
                  </div>
                </div>
                <div class="flex-1 relative">
                  <div class="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                    <LMap
                      style="height: 800px"
                      :zoom="17"
                      :center="data.coordinate"
                      :use-global-leaflet="false"
                    >
                      <LTileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                        layer-type="base"
                        name="OpenStreetMap"
                      />
                      <LGeoJson :geojson="geoJsonData" :options-style="geoJsonStyler" />
                      <LMarker :lat-lng="data.coordinate" />
                    </LMap>
                    <div class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="border-green-500 md:border-4 sm:border-2 " v-show=false>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>