<script setup lang="ts">
import { ref } from 'vue';

import useTaskStore from '@/composables/useTaskStore';

const taskStore = useTaskStore();

const taskName = ref('');

function handleEnter() {
  if (taskName.value.trim() === '') {
    return;
  }

  taskStore.createNewTask(taskName.value);
  taskName.value = '';
}
</script>

<template>
  <label
    for="new-task"
  >
    New Task
  </label>
  <input
    id="new-task"
    v-model="taskName"
    class="new-task-input__input"
    placeholder="Take Out Garbage"
    type="text"
    @keyup.enter="handleEnter"
  >
</template>

<style lang="scss">
.new-task-input {
  &__input {
    margin-top: 1rem;
  }
}
</style>
