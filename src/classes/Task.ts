// export default interface Task {
//   completed: boolean | 'indeterminate';
//   name: string;
//   tasks: Task[];
// }

export default class Task {
  completed: boolean | 'indeterminate';

  name: string;

  tasks: Task[];

  constructor(name = '') {
    this.completed = false;
    this.name = name;
    this.tasks = [];
  }
}
