import { Routes } from '@angular/router';
import { Register } from './Components/register/register';
import { Login } from './Components/login/login';
import { Home } from './Components/home/home';
// import { Task } from './Component/task';
import { AddTask } from './Components/add-task/add-task';
import { UpdateTask } from './Components/update-task/update-task';
import { DeleteTask } from './Components/delete-task/delete-task';
import { ViewTask } from './Components/view-task/view-task';
import { Task } from './Components/task/task';

export const routes: Routes = [
 { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'task', component: Task},
  { path: 'task', component: Task, children: [
    { path: 'add', component: AddTask },
    { path: 'update', component: UpdateTask },
    { path: 'delete', component: DeleteTask },
    { path: 'view', component: ViewTask }
  ]},
];
