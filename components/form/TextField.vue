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

  <label v-bind="labelProps" class="block mb-2 text-sm font-medium text-gray-900">{{ label }}</label>
  <input v-bind="inputProps" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5  ">
  <p v-if="errorMessage" v-bind="errorMessageProps" class="mt-2 text-sm text-gray-500 dark:text-gray-400">{{ errorMessage }}</p>
  <div v-if="description" v-bind="descriptionProps" class="hint">
    {{ description }}
  </div>
</template>

<style scoped>

</style>