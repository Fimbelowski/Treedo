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

  function createNewTask(name: string, parent: Task | null = null) {
    const newTask: Task = {
      complete: false,
      id: getNextTaskId(),
      name,
      parent,
      subtasks: [],
    };

    if (parent === null) {
      tasks.push(newTask);
    } else {
      parent.subtasks.push(newTask);
    }

    taskMap.set(newTask.id, newTask);
  }

  function getNextTaskId() {
    const id = nextTaskId.value;

    nextTaskId.value += 1;

    return id;
  }

  function getTaskById(id: number) {
    const targetTask = taskMap.get(id);

    if (targetTask === undefined) {
      throw new Error(`Error getting task, no task with id of ${id} exists.`);
    }

    return targetTask;
  }

  function updateTaskComplete(taskId: number, newValue: boolean) {
    const targetTask = getTaskById(taskId);

    targetTask.complete = newValue;

    const { parent } = targetTask;

    if (parent !== null) {
      updateTaskCompleteBasedOnSubtasks(parent.id);
    }
  }

  function updateTaskCompleteBasedOnSubtasks(taskId: number) {
    const targetTask = getTaskById(taskId);

    if (targetTask.subtasks.length === 0) {
      throw new Error('"updateTaskCompleteBasedOnSubtasks" called on a task with no subtasks.');
    }

    const oldValue = targetTask.complete;
    const newValue = targetTask.subtasks.every((subtask) => subtask.complete);

    targetTask.complete = newValue;

    const { parent } = targetTask;

    if (
      oldValue !== newValue
      && parent !== null
    ) {
      updateTaskCompleteBasedOnSubtasks(parent.id);
    }
  }

  return {
    createNewTask,
    tasks: exposedTasks,
    updateTaskComplete,
  };
});
