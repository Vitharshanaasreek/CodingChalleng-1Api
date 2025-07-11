import { Component, OnInit } from '@angular/core';
// import { Task } from '../task/task';
import { TaskService } from '../../Service/task-service';
import { Task } from '../../Class/task';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-task',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './view-task.html',
  styleUrl: './view-task.css'
})
export class ViewTask implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  searchText: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getAllTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.filteredTasks = data;
      },
      error: (err) => {
        console.error('Error fetching tasks:', err);
      }
    });
  }

  onSearch(): void {
    this.filteredTasks = this.tasks.filter(task =>
      task.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

}
