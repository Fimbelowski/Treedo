<script setup lang="ts">
import TaskInterface from '@/types/Task';
import useTaskStore from '@/composables/useTaskStore';

const taskStore = useTaskStore();

const props = defineProps<{
  task: TaskInterface
}>();

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  const { checked } = target;

  taskStore.updateTaskComplete(props.task.id, checked);
}

function handleAddSubtask() {
  taskStore.createNewTask('A New Subtask', props.task);
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
    <button
      type="button"
      @click="handleAddSubtask"
    >
      Add Subtask
    </button>
    <div
      class="task__subtasks"
    >
      <Task
        v-for="subtask in task.subtasks"
        :key="subtask.id"
        :task="subtask"
      />
    </div>
  </div>
</template>

<style lang="scss">
.task {
  &__subtasks {
    padding-left: 1rem;
  }
}
</style>
