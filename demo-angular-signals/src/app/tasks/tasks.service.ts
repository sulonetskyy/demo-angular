import {DUMMY_TASKS} from '../dummy-tasks';
import {NewTaskData} from "./task/task.model";
import {Injectable, signal} from "@angular/core";

@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks = signal(DUMMY_TASKS);

  constructor() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.tasks.set(JSON.parse(tasks));
    }
  }

  getUserTasks = (userId: string) => this.tasks().filter(task => task.userId === userId);

  addTask = (taskData: NewTaskData, userId: string) => {
    this.tasks.update(tasks => [
      {
        id: new Date().getTime().toString(),
        userId: userId,
        title: taskData.title,
        summary: taskData.summary,
        dueDate: taskData.date
      },
      ...tasks
    ]);
    this.saveTasks();
  }

  removeTask = (id: string) => {
    this.tasks.update(tasks => tasks.filter(task => task.id !== id));
    this.saveTasks();
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
  }
}
