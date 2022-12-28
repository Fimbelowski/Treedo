<script setup lang="ts">
import { computed } from 'vue';

import NewTaskInput from './components/NewTaskInput.vue';
import Task from '@/components/Task.vue';
import useTaskStore from './composables/useTaskStore';

const taskStore = useTaskStore();

const showNewTaskInput = computed(() => taskStore.focusedTaskId === null);
</script>

<template>
  <div class="container">
    <Task
      v-for="task in taskStore.tasks"
      :key="task.id"
      :task="task"
    />
    <NewTaskInput
      v-if="showNewTaskInput"
    />
  </div>
</template>

<style lang="scss">
@import './sass/base/reset';
@import './sass/base/typography';

.container {
  max-width: 100rem;
  background-color: #eee;
  margin: 10rem auto;
  padding: 2rem;
}
</style>
