<script setup lang="ts">
import type { EventDocument } from "~/prismicio-types";
import type {DateField} from "@prismicio/client";
import type {TimestampField} from "@prismicio/types";
import { isFilled } from "@prismicio/helpers";

const props = defineProps<{ day: string | number, events: EventDocument[] }>();
const { day, events } = toRefs(props);
const { isMobile } = useDevice();
const { locale } = useI18n();
const richTextSerializer = useRichTextSerializer();

type ExpandedState = Record<string, boolean>
const isExpanded: Ref<ExpandedState> = ref({});
const toggle = (item: string) => {
  isExpanded.value[item] = !isExpanded.value[item];
};

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

const getArrowStyle = (type: string | null): string => {
  if (null !== type && type in colorByType) {
    const { color } = colorByType[type as EventType];
    return `color: ${color}`;
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
  <div
    :class="isMobile ? `p-4 my-2` : `p-8`"
    class="bg-card-zebred rounded-lg shadow-lg"
  >
    <div class="border-b-2 text-zinc-400 font-bold text-2xl border-zinc-500 py-2 dark:border-white/10 items-end">
      {{ useFormatIntoFrenchDate(day as DateField, "short", locale) }}
    </div>

      <div
        v-for="event in events"
        :key="event.uid"
        class="bg-zinc-200 shadow-lg overflow-hidden"
        :class="isMobile ? `py-2 my-4` : `py-4 my-8`"
        :style="getStyle(event.data.type)"
      >

        <div class="w-full flex justify-between  overflow-hidden">
          <div class="px-2 items-start al text-xl">
            {{ getTime(event.data.date_event) }}
          </div>
          <h4 class="text-xl flex-auto items-center font-semibold">{{ event.data.titre }}</h4>
          <button
            v-if="event.data.display_author"
            class="flex-none mr-1 focus:outline-none focus:ring-2 focus:ring-opacity-50 items-end"
            aria-controls="expandable-content"
            :style="getArrowStyle(event.data.type)"
            @click="toggle(event.uid)"
          >
            <Icon
                name="material-symbols-light:keyboard-arrow-down-rounded"
                size="24"
                class="transition-transform duration-500"
                :class="isExpanded[event.uid] ? `transform rotate-180`: ``"
            />
          </button>

        </div>
          <Transition
            v-if="event.data.display_author"
            enter-active-class="transition-[max-height] duration-500 ease-out"
            enter-from-class="max-h-0 overflow-hidden"
            enter-to-class="max-h-40"
            leave-active-class="transition-[max-height] duration-500 ease-in"
            leave-from-class="max-h-40"
            leave-to-class="max-h-0 overflow-hidden"
          >
            <div v-if="isExpanded[event.uid]" :style="getArrowStyle(event.data.type)" class="w-full m-2 p-2">
              <div class="mx-auto w">
                <div class="card md:flex">
                  <div class="w-16 h-16 mx-auto mb-4 md:mr-6 flex-shrink-0">
                    <prismic-image
                      :field="event?.data.photo_intervenant"
                      class="rounded-full object-cover shadow-lg"
                    />
                  </div>
                  <div class="flex-grow text-center md:text-left">
                    <p class="italic font-thin">{{ event.data.author_job }}</p>
                    <h5 class="text-xl heading">{{ event.data.author }}</h5>
                    <prismic-rich-text
                      :field="event.data.content"
                      :serializer="richTextSerializer"
                      class="max-w-2xl font-thin lg:mb-4 sm:mb-2"
                      :class="isMobile ? `text-xl` : `text-lg`"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>

</template>

<style scoped>
.bg-card-zebred {
  background-image: url("/img/zebra.png");
}
</style>