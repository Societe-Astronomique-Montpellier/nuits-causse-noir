<script setup lang="ts">
import type {AllDocumentTypes, EventDocument, HomepageDocument, RateDocument} from "~/prismicio-types";

const prismic = usePrismic();

definePageMeta({
  layout: "home",
});

const {data } = useAsyncData('data', async () => {

});
const [ config,  rates, events] = await Promise.all([
  (
    await prismic.client.getSingle("homepage", {
      lang: 'fr-fr'
    }) as HomepageDocument
  ),
  (
    await prismic.client.getAllByType<AllDocumentTypes>("rate", {
      lang: 'fr-fr'
    }) as RateDocument[]
  ),
  (
    await prismic.client.getAllByType<AllDocumentTypes>("event", {
      lang: 'fr-fr',
      orderings: {
        field: 'my.event.date_event',
      }
    }) as EventDocument[]
  )
]);

</script>
<template>
  <div>
    <pre>{{ config.data }}</pre>
    <ul>
      <li v-for="rate in rates">
        <pre>{{ rate.data }}</pre>
      </li>
    </ul>
    <ul>
      <li v-for="event in events">
        <pre>{{ event.data }}</pre>
      </li>
    </ul>
  </div>
</template>
