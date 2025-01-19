<script setup lang="ts">
const { $apiFetch } = useNuxtApp();
import { useForm } from '@formwerk/core';
const { handleSubmit } = useForm();

import TextField from "@/components/form/TextField.vue";
import TextAreaField from "~/components/form/TextAreaField.vue";

let displayMsg: Ref<boolean> = ref(false);
let isSuccess: Ref<boolean> = ref(false);
let msg: Ref<string> = ref('');
let isLoadingShow: Ref<boolean> = ref(false);
let isBtnDisabled: Ref<boolean> = ref(false);

let colorBgd: Ref<string> = ref('');
let colorBgd2: Ref<string> = ref('');


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
  isLoadingShow.value = true;
  isBtnDisabled.value = true;

  setTimeout(async () => {
    const response: any = await $apiFetch('/contact', {
      method: 'POST',
      body: submitedData.toJSON()
    });

    displayMsg.value = true;
    isSuccess.value = response.success;
    if (false === response.success) {
      colorBgd.value = 'bg-red-100';
      colorBgd2.value = 'bg-red-400';
      msg.value = response.message;
    } else if (true === response.success) {
      msg.value = response.message;
      colorBgd.value = 'bg-green-100';
      colorBgd2.value = 'bg-green-400';
    }

    isBtnDisabled.value = false;
    isLoadingShow.value = false;
  }, 200);
});
</script>

<template>
  <div class="md:mx-12 md:p-16 sm:mx-2 sm:p-4">
    <div class="bg-opacity-75 bg-zinc-500 rounded px-8 pt-6 pb-8 mb-4">

      <div class="text-left py-4 lg:px-4" v-show="displayMsg">
        <div :class="`p-2 ${colorBgd} items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex`" role="alert">
          <span :class="`flex rounded-full ${colorBgd2} uppercase px-2 py-1 text-xs font-bold mr-3`">New</span>
          <span class="font-semibold mr-2 text-left flex-auto text-gray-800">{{  msg }}</span>
        </div>
      </div>

      <form action="#" @submit.prevent="submitForm" novalidate class="" v-show="!isSuccess">

        <TextField name="name" label="Votre nom" type="text" required :model-value="formData.name"  class="Field" />
        <TextField name="email" label="Votre email" type="email" required :model-value="formData.email"  />
        <TextAreaField name="message" label="Votre message" :model-value="formData.message" />

        <button
            data-ripple-light="true"
            type="submit" class="md:py-4 md:px-6 sm:py-2 sm:px-3 bg-green-500 text-white rounded-2xl font-bold md:text-2xl sm:text-2xl"
            :disabled="isBtnDisabled"
        >
          <Icon name="line-md:loading-twotone-loop" v-show="isLoadingShow" size="24" />
          Envoyer
        </button>
      </form>
    </div>
  </div>

</template>

<style scoped>

</style>