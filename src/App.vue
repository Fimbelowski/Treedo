<script setup lang="ts">
import { reactive } from 'vue';

import NewTaskInput from '@/components/NewTaskInput.vue';
import Task from './classes/Task';

const tasks: Task[] = reactive([]);

function handleSubmit(name: string) {
  tasks.push(new Task(name));
}
</script>

<template>
  <div class="container">
    <ul
      v-if="tasks.length > 0"
    >
      <li
        v-for="(task, index) in tasks"
        :key="index"
      >
        {{ task.name }}
      </li>
    </ul>
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
