<script setup lang="ts">
import Task from '@/types/Task';

defineProps<{
  task: Task
}>();

const emit = defineEmits<{
  (e: 'update:complete', newValue: boolean): void,
}>();

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  const { checked } = target;
  emit('update:complete', checked);
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
