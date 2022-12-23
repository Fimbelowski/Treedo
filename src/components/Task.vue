<script setup lang="ts">
import Task from '@/types/Task';

defineProps<{
  task: Task
}>();
</script>

<template>
  <div
    class="task"
  >
    {{ task.name }}
  </div>
</template>
