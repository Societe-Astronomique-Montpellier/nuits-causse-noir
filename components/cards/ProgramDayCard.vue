<script setup lang="ts">
import type {  EventDocument} from "~/prismicio-types";
import type {DateField} from "@prismicio/client";
import type {TimestampField} from "@prismicio/types";

const props = defineProps<{ day: string | number, events: EventDocument[] }>();
const { day, events } = toRefs(props);

type EventType = "Activitée" | "Conférence" | "Atelier" | "Nuit d'observation";
interface ColorConfig {
  background: string;
  border: string;
  color: string;
}

type ColorByType = Record<EventType, ColorConfig>;
const colorByType: ColorByType = {
  "Activitée": {
    "background": "rgba(255,255,255,0.05)",
    "border": "rgba(255,255,255,0.2)",
    "color": "white"
  },
  "Conférence": {
    "background": "rgba(150,150,255,0.2)",
    "border": "rgba(150,150,255,0.4)",
    "color": "white"
  },
  "Atelier": {
    "background": "rgba(150,255,255,0.2)",
    "border": "rgba(150,255,255,0.4)",
    "color": "white"
  },
  "Nuit d'observation": {
    "background": "rgba(100,0,0,0.3)",
    "border": "rgba(150,0,0,0.4)",
    "color": "red"
  },
}

const getStyle = (type: string | null): string => {
  if (null !== type && type in colorByType) {
    const { background, border, color } = colorByType[type as EventType];

    return `background: ${background}; border: 1px solid ${border}; color: ${color}`;
  }
  return "";
};

const getTime = (dateEvent: TimestampField): string => {
  const date = new Date(dateEvent as string);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}H${minutes}`;
}

</script>

<template>
  <div class="bg-card-zebred rounded-lg shadow-lg p-6">
    <div class="border-b-2 text-zinc-400 font-bold text-2xl border-zinc-500 py-2 dark:border-white/10 items-end">
      {{ useFormatIntoFrenchDate(day as DateField, "short") }}
    </div>
    <div class="">
      <div v-for="event in events" :key="event.uid" class="bg-white shadow-lg flex py-4 my-8" :style="getStyle(event.data.type)">
        <div class="px-2 text-xl">
          {{ getTime(event.data.date_event) }}
        </div>
        <div>
          <div class="flex items-center ">
            <h3 class="text-xl font-semibold">{{ event.data.titre }}</h3>
          </div>
          <p>{{ event.data.author }}</p>
          <p>{{ event.data.author_job }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-card-zebred {
  background-image: url("/img/zebra.png");
}
</style>