export default interface Task {
  complete: boolean;
  id: number;
  indeterminate: boolean;
  name: string;
  parent: Task | null;
  subtasks: Task[];
}
