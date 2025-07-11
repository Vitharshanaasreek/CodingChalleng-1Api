import { Component, OnInit } from '@angular/core';
import { Task } from '../../Class/task';
import { TaskService } from '../../Service/task-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-delete-task',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './delete-task.html',
  styleUrl: './delete-task.css'
})
export class DeleteTask implements OnInit {
  tasks: Task[] = [];
  successMessage = '';
  errorMessage = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe({
      next: (data) => {
        this.tasks = data;
      },
      error: (err) => {
        console.error('Error loading tasks', err);
      }
    });
  }

  deleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.successMessage = 'Task deleted successfully!';
          this.errorMessage = '';
          this.tasks = this.tasks.filter(t => t.id !== id);
        },
        error: (err) => {
          this.errorMessage = 'Failed to delete task.';
          this.successMessage = '';
          console.error(err);
        }
      });
    }
  }

}
