<script setup lang="ts">
import { reactive } from 'vue';

import Task from './classes/Task';

const tasks: Task[] = reactive([]);

function addTask() {
  tasks.push(new Task('A New Task!'));
}
</script>

<template>
  <div class="container">
    <button
      type="button"
      @click="addTask()"
    >
      Add Task
    </button>
    <ul v-if="tasks.length > 0">
      <li
        v-for="task in tasks"
        :key="task.name"
      >
        {{ task.name }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
@import './sass/base/reset';
@import './sass/base/typography';

.container {
  max-width: 1000px;
  background-color: gray;
  margin: 100px auto;
  padding: 20px;
}
</style>
