<script setup lang="ts">
import { type TextFieldProps, useTextField } from '@formwerk/core';

const props = defineProps<TextFieldProps>();

const {
  inputProps,
  labelProps,
  errorMessage,
  errorMessageProps,
  descriptionProps,
} = useTextField(props);
</script>

<template>

  <label v-bind="labelProps" class="block mb-2 text-sm font-medium text-gray-900 ">{{ label }}</label>
  <textarea v-bind="inputProps" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 "></textarea>
  <div v-if="errorMessage" v-bind="errorMessageProps" class="error">
    {{ errorMessage }}
  </div>
  <div v-if="description" v-bind="descriptionProps" class="hint">
    {{ description }}
  </div>

</template>

