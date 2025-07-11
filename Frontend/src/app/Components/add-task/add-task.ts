import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Priority } from '../../Class/priority';
import { Status } from '../../Class/status';
import { TaskService } from '../../Service/task-service';
import { Task } from '../../Class/task';

@Component({
  selector: 'app-add-task',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css'
})
export class AddTask implements OnInit {
  taskForm!: FormGroup;
  priorities = Object.values(Priority);
  statuses = Object.values(Status);
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const task: Task = this.taskForm.value;
      this.taskService.addTask(task).subscribe({
        next: (res) => {
          this.successMessage = 'Task added successfully!';
          this.errorMessage = '';
          this.taskForm.reset();
        },
        error: (err) => {
          console.error('Error adding task:', err);
          this.errorMessage = 'Failed to add task.';
          this.successMessage = '';
        }
      });
    }
  }

}
