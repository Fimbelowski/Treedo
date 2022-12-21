export default class Task {
  completed: boolean | 'indeterminate';

  name: string;

  tasks: Task[];

  constructor(name: string) {
    this.completed = false;
    this.name = name;
    this.tasks = [];
  }
}
