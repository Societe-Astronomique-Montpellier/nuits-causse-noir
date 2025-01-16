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
  <div class="field mb-4">
    <label v-bind="labelProps">{{ label }}</label>
    <input v-bind="inputProps" />

    <div v-if="errorMessage" v-bind="errorMessageProps" class="error">
      {{ errorMessage }}
    </div>

    <div v-if="description" v-bind="descriptionProps" class="hint">
      {{ description }}
    </div>
  </div>
</template>

<style scoped>

</style>