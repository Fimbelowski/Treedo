import { reactive } from 'vue';

import Task from '@/types/Task';

export default function useTask(name: string) {
  const state = reactive<Task>({
    complete: false,
    name,
  });

  return {
    ...state,
  };
}
