<script setup lang="ts">
import Task from '@/types/Task';
import useTaskStore from '@/composables/useTaskStore';

const taskStore = useTaskStore();

const props = defineProps<{
  task: Task
}>();

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  const { checked } = target;

  taskStore.updateTaskComplete(props.task.id, checked);
}
</script>

<template>
  <div
    class="task"
  >
    <input
      :checked="task.complete"
      type="checkbox"
      @input="handleInput"
    >
    {{ task.name }}
  </div>
</template>
