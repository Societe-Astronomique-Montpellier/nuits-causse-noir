<script setup lang="ts">
import { useForm } from '@formwerk/core';
const { handleSubmit } = useForm();

import TextField from "@/components/form/TextField.vue";
import TextAreaField from "~/components/form/TextAreaField.vue";

/**
 * todo : export interface
 */
interface IFormContact {
  name: string;
  email: string;
  message: string
}
const formData: IFormContact = reactive({
  name: "",
  email: "",
  message: ""
});

const submitForm = handleSubmit(async (submitedData) => {
  setTimeout(async () => {
    const response = await $fetch('/api/contact', {
      method: 'POST',
      body: submitedData.toJSON()
    });

    console.log(response);
  }, 1000);
});
</script>

<template>
  <div class="mx-12 p-16">
    <form action="#" @submit.prevent="submitForm" novalidate class="bg-zinc-500 rounded px-8 pt-6 pb-8 mb-4">
      <TextField name="name" label="Votre nom" type="text" required :model-value="formData.name"  class="Field" />
      <TextField name="email" label="Votre email" type="email" required :model-value="formData.email"  />
      <TextAreaField name="message" label="Votre message" :model-value="formData.message" />

      <button data-ripple-light="true" type="submit" class="py-4 px-12 bg-green-500 text-white rounded-full font-bold text-2xl">Envoyer</button>
    </form>
  </div>

</template>

<style scoped>

</style>