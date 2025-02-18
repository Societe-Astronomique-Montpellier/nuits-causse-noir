<script setup lang="ts">
const { $apiFetch } = useNuxtApp();
import { useForm } from '@formwerk/core';
import { z } from 'zod';
const { isMobile } = useDevice();
const { t } = useI18n();

const { handleSubmit } = useForm({
  schema: z.object({
    name: z.string().min(1, 'Un nom est requis'),
    email: z.string().email(),
    message: z.string().min(1, 'Un message est requis'),
  }),
});

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
  <div class="mx-2 md:p-16 sm:p-4 w-auto">
    <div class="bg-opacity-75 bg-zinc-500 border rounded-lg md:p-12 sm:p-4 mx-auto md:my-8 sm:my-2 max-w-2x">

      <div class="text-left md:py-4  lg:px-4 w-fit" v-show="displayMsg">
        <div :class="`p-2 ${colorBgd} items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex`" role="alert">
          <span :class="`flex rounded-full ${colorBgd2} uppercase px-2 py-1 text-xs font-bold mr-3`">New</span>
          <span class="font-semibold mr-2 text-left flex-auto text-gray-800">{{  msg }}</span>
        </div>
      </div>

      <form action="#" @submit.prevent="submitForm" v-show="!isSuccess">

        <TextField
          name="name"
          :label="t('homepage.blocks.contact.form.name.label')"
          _placeholder="t('homepage.blocks.contact.form.name.placeholder')"
          type="text"
          required
          :model-value="formData.name"
        />

        <TextField
          name="email"
          :label="t('homepage.blocks.contact.form.email.label')"
          _placeholder="t('homepage.blocks.contact.form.email.placeholder')"
          type="email"
          required
          :model-value="formData.email"
        />

        <TextAreaField
          name="message"
          :label="t('homepage.blocks.contact.form.message.label')"
          _placeholder="t('homepage.blocks.contact.form.message.placeholder')"
          :model-value="formData.message"
        />

        <button
          data-ripple-light="true"
          type="submit"
          class="
            text-neutral-100 bg-green-700
            hover:bg-zinc-800 hover:border-green-500 hover:border-2
            transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-black
            px-8 py-4 rounded-full font-bold"
          :disabled="isBtnDisabled"
        >
          {{ $t('homepage.blocks.contact.form.submit') }}
          <Icon name="line-md:loading-twotone-loop" v-show="isLoadingShow" size="24" />
        </button>
      </form>
    </div>
  </div>

</template>

<style scoped>

</style>