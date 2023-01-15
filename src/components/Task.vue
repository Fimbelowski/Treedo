<script setup lang="ts">
import {
  computed,
  ref,
  watch,
} from 'vue';

import TaskInterface from '@/types/Task';
import useTaskStore from '@/composables/useTaskStore';

const taskStore = useTaskStore();

const props = defineProps<{
  task: TaskInterface
}>();

const checkbox = ref<HTMLInputElement | null>(null);

watch(
  () => props.task.indeterminate,
  (newValue) => {
    setCheckboxIndeterminate(newValue);
  },
);

const hasSubtasks = computed(() => props.task.subtasks.length > 0);

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  const { checked } = target;

  taskStore.updateTaskComplete(props.task.id, checked);
}

function handleAddSubtask() {
  taskStore.createNewTask('A New Subtask', props.task.id);
}

function setCheckboxIndeterminate(newValue: boolean) {
  if (checkbox.value === null) {
    throw new Error('Cannot set indeterminate on null.');
  }

  checkbox.value.indeterminate = newValue;
}
</script>

<template>
  <div
    class="task"
  >
    <input
      ref="checkbox"
      :checked="task.complete"
      :disabled="hasSubtasks"
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
