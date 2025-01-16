<script setup lang="ts">
import { useForm } from '@formwerk/core';
const { handleSubmit } = useForm();
const mail = useMail();

import TextField from "@/components/form/TextField.vue";

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


const submitForm = handleSubmit((submitedData) => {
  setTimeout(async () => {
    console.log(submitedData);
    const {from, name, text} = submitedData.toObject();
    try {
      mail.send({
        from: from,
        subject: `NCN - Message de ${name}`,
        text: text
      });
    } catch (err) {

    }

  }, 1000);
});
</script>

<template>
  <form action="#" @submit.prevent="submitForm" novalidate class="bg-zinc-500 rounded px-8 pt-6 pb-8 mb-4">
    <TextField name="name" label="Votre nom" type="text" required v-model="formData.name" />
    <TextField name="email" label="Votre email" type="email" required v-model="formData.email" />

    <button type="submit" class="py-4 px-12 bg-green-500 text-white rounded-full font-bold text-2xl">Envoyer</button>
  </form>
</template>

<style scoped>

</style>