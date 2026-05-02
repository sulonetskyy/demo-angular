import {Component, computed, inject, input, signal} from '@angular/core';
import {TaskComponent} from './task/task.component';
import {NewTaskComponent} from './new-task/new-task.component';
import {TasksService} from "./tasks.service";

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  userId = input.required<string>();
  name = input.required<string>();
  isAddingTask = signal(false);

  private tasksService = inject(TasksService);

  selectedUserTasks = computed(() => this.tasksService.getUserTasks(this.userId()));

  onStartAddTask = () => this.isAddingTask.set(true);

  onCloseAddTask = () => this.isAddingTask.set(false);
}
