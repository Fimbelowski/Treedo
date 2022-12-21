<script setup lang="ts">
import { ref } from 'vue';

import BaseTextInput from './BaseTextInput.vue';

const emit = defineEmits<{
  (e: 'submit', name: string): void,
}>();

defineProps<{
  id: string;
}>();

const newTaskName = ref('');

function handleEnter() {
  emit('submit', newTaskName.value);
  newTaskName.value = '';
}
</script>

<template>
  <BaseTextInput
    :id="id"
    v-model="newTaskName"
    label="New Task Name"
    placeholder="Take Out Trash"
    @keyup.enter="handleEnter"
  />
</template>
