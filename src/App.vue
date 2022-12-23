<script setup lang="ts">
import {
  reactive,
  ref,
} from 'vue';

import Task from '@/components/Task.vue';
import TaskInterface from '@/types/Task';

const tasks = reactive<TaskInterface[]>([]);
const nextTaskId = ref(1);

function getNextTaskId() {
  const id = nextTaskId.value;

  nextTaskId.value += 1;

  return id;
}

function addTask() {
  const newTask = {
    complete: false,
    id: getNextTaskId(),
    name: 'A new task',
  };

  tasks.push(newTask);
}
</script>

<template>
  <main
    class="main"
  >
    <Task
      v-for="(task, index) in tasks"
      :key="index"
      :task="task"
    />
    <button
      type="button"
      @click="addTask"
    >
      Add Task
    </button>
  </main>
</template>

<style lang="scss">
@import './sass/base/reset';
@import './sass/base/typography';

.main {
  max-width: 100rem;
  background-color: #eee;
  margin: 10rem auto;
  padding: 2rem;
}
</style>
