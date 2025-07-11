import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Priority } from '../../Class/priority';
import { Status } from '../../Class/status';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../Service/task-service';
import { Task } from '../../Class/task';

@Component({
  selector: 'app-update-task',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './update-task.html',
  styleUrl: './update-task.css'
})
export class UpdateTask implements OnInit {
  tasks: Task[] = [];
  selectedTask!: Task;
  updateForm!: FormGroup;
  successMessage = '';
  errorMessage = '';
  priorities = Object.values(Priority);
  statuses = Object.values(Status);

  constructor(private taskService: TaskService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.taskService.getAllTasks().subscribe({
      next: (res) => {
        this.tasks = res;
      },
      error: (err) => {
        console.error('Failed to fetch tasks', err);
      }
    });

    this.updateForm = this.fb.group({
      description: [''],
      dueDate: [''],
      priority: [''],
      status: ['']
    });
  }

  onSelect(task: Task): void {
    this.selectedTask = task;
    this.updateForm.patchValue({
      description: task.description,
      dueDate: task.dueDate ? task.dueDate.toString().substring(0, 10) : '',
      priority: task.priority,
      status: task.status
    });
  }

  onUpdate(): void {
    if (this.selectedTask && this.updateForm.valid) {
      const updatedTask: Task = {
        ...this.selectedTask,
        ...this.updateForm.value
      };

      this.taskService.updateTask(this.selectedTask.id, updatedTask).subscribe({
        next: (res) => {
          this.successMessage = 'Task updated successfully!';
          this.errorMessage = '';
          // Update local list for instant UI update
          const index = this.tasks.findIndex(t => t.id === res.id);
          if (index !== -1) this.tasks[index] = res;
        },
        error: (err) => {
          this.errorMessage = 'Failed to update task.';
          this.successMessage = '';
          console.error('Update error:', err);
        }
      });
    }
  }

}
