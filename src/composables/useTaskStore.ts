import {
  computed,
  reactive,
  ref,
} from 'vue';
import { defineStore } from 'pinia';

import Task from '@/types/Task';

export default defineStore('tasks', () => {
  const tasks = reactive<Task[]>([]);
  const taskMap = reactive(new Map<number, Task>());

  const exposedTasks = computed(() => tasks);

  const nextTaskId = ref(1);

  function createNewTask() {
    const newTask: Task = {
      complete: false,
      id: getNextTaskId(),
      name: 'A New Task',
    };

    tasks.push(newTask);
    taskMap.set(newTask.id, newTask);
  }

  function getNextTaskId() {
    const id = nextTaskId.value;

    nextTaskId.value += 1;

    return id;
  }

  function updateTaskComplete(taskId: number, newValue: boolean) {
    const targetTask = taskMap.get(taskId);

    if (targetTask === undefined) {
      throw new Error(`Task with id of ${taskId} does not exist.`);
    }

    targetTask.complete = newValue;
  }

  return {
    createNewTask,
    tasks: exposedTasks,
    updateTaskComplete,
  };
});
