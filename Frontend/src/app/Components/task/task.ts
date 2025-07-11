import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task',
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './task.html',
  styleUrl: './task.css'
})
export class Task {

}
