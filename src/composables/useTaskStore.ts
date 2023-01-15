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

  const focusedTaskId = ref<number | null>(null);

  function createNewTask(name: string, parentId = 0) {
    const parent = parentId !== 0 ? getTaskById(parentId) : null;

    const newTask: Task = {
      complete: false,
      id: getNextTaskId(),
      indeterminate: false,
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

  function getTaskCompleteBasedOnSubtasks(taskId: number) {
    const targetTask = getTaskById(taskId);

    if (targetTask.subtasks.length === 0) {
      throw new Error('"getTaskCompleteBasedOnSubtasks" called on a task with no subtasks.');
    }

    return targetTask.subtasks.every((subtask) => subtask.complete);
  }

  function getTaskIndeterminateBasedOnSubtasks(taskId: number) {
    const targetTask = getTaskById(taskId);

    if (targetTask.subtasks.length === 0) {
      throw new Error('"updateTaskIndeterminateBasedOnSubtask" called on a task with no subtasks.');
    }

    const { subtasks } = targetTask;

    const hasIndeterminateSubtasks = subtasks.some((subtask) => subtask.indeterminate);

    const hasCompleteSubtasks = subtasks.some((subtask) => subtask.complete);
    const hasIncompleteSubtasks = subtasks.some((subtask) => !subtask.complete);

    return hasIndeterminateSubtasks || (hasCompleteSubtasks && hasIncompleteSubtasks);
  }

  function updateTaskComplete(taskId: number, newValue: boolean) {
    const targetTask = getTaskById(taskId);

    targetTask.complete = newValue;

    const { parent } = targetTask;

    if (parent === null) {
      return;
    }

    // Update complete in parent task
    updateTaskComplete(parent.id, getTaskCompleteBasedOnSubtasks(parent.id));

    // Update indeterminate in parent task
    updateTaskIndeterminate(parent.id, getTaskIndeterminateBasedOnSubtasks(parent.id));
  }

  function updateTaskIndeterminate(taskId: number, newValue: boolean) {
    const targetTask = getTaskById(taskId);

    targetTask.indeterminate = newValue;

    const { parent } = targetTask;

    if (parent === null) {
      return;
    }

    updateTaskIndeterminate(parent.id, getTaskIndeterminateBasedOnSubtasks(parent.id));
  }

  return {
    createNewTask,
    focusedTaskId,
    tasks: exposedTasks,
    updateTaskComplete,
  };
});
