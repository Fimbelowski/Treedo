<script setup lang="ts">
import Task from '@/components/Task.vue';
import useTaskStore from './composables/useTaskStore';

const taskStore = useTaskStore();

function addTask() {
  taskStore.createNewTask();
}
</script>

<template>
  <div class="container">
    <button
      type="button"
      @click="addTask"
    >
      Add Task
    </button>
    <Task
      v-for="task in taskStore.tasks"
      :key="task.id"
      :task="task"
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
