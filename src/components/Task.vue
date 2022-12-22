<script setup lang="ts">
import CheckboxInput from './CheckboxInput.vue';
import Task from '@/types/Task';

defineProps<{
  task: Task
}>();

const emit = defineEmits<{
  (e: 'update:complete', newValue: boolean): void,
}>();

function handleUpdateComplete(newValue: boolean) {
  emit('update:complete', newValue);
}
</script>

<template>
  <CheckboxInput
    :id="task.name"
    :model-value="task.complete"
    @update:model-value="handleUpdateComplete"
  />
  <div>
    {{ task.name }}
  </div>
</template>
