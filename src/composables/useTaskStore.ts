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

    const oldParentComplete = parent.complete;
    const newParentComplete = getTaskCompleteBasedOnSubtasks(parent.id);

    if (oldParentComplete !== newParentComplete) {
      updateTaskComplete(parent.id, newParentComplete);
    }

    const oldParentIndeterminate = parent.indeterminate;
    const newParentIndeterminate = getTaskIndeterminateBasedOnSubtasks(parent.id);

    if (oldParentIndeterminate !== newParentIndeterminate) {
      updateTaskIndeterminate(parent.id, newParentIndeterminate);
    }
  }

  function updateTaskIndeterminate(taskId: number, newValue: boolean) {
    const targetTask = getTaskById(taskId);

    const oldValue = targetTask.indeterminate;

    targetTask.indeterminate = newValue;

    const { parent } = targetTask;

    if (parent === null) {
      return;
    }

    if (
      oldValue !== newValue
      && newValue
    ) {
      // newValue is true, every parent of this task will also be indeterminate
      updateTaskIndeterminate(parent.id, newValue);
    } else if (oldValue !== newValue) {
      // the value has changed, parent indeterminate values need to be reconsidered
      const parentIndeterminate = getTaskIndeterminateBasedOnSubtasks(parent.id);
      updateTaskIndeterminate(parent.id, parentIndeterminate);
    }
  }

  return {
    createNewTask,
    tasks: exposedTasks,
    updateTaskComplete,
  };
});
