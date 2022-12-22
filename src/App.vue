<script setup lang="ts">
import { reactive } from 'vue';

import NewTaskInput from '@/components/NewTaskInput.vue';
import Task from '@/components/Task.vue';
import TaskInterface from '@/types/Task';
import useTask from '@/composables/useTask';

const tasks: TaskInterface[] = reactive([]);

function handleSubmit(name: string) {
  tasks.push(useTask(name));
}

function handleUpdateComplete(newValue: boolean, index: number) {
  const targetTask = tasks[index];
  targetTask.complete = newValue;
}
</script>

<template>
  <div class="container">
    <Task
      v-for="(task, index) in tasks"
      :key="index"
      :task="task"
      @update:complete="handleUpdateComplete($event, index)"
    />
    <NewTaskInput
      id="new-task"
      @submit="handleSubmit"
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
