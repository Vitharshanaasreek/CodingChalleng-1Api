import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../Class/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:1423/task';

  constructor(private http: HttpClient) {}

 getAllTasks(): Observable<Task[]> {
  const token = localStorage.getItem('jwt');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get<Task[]>(`${this.baseUrl}/all`, { headers });
}
addTask(task: Task): Observable<Task> {
  const token = localStorage.getItem('jwt');
  return this.http.post<Task>(`${this.baseUrl}/add`, task, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
updateTask(id: number, task: Task): Observable<Task> {
  const token = localStorage.getItem('jwt');
  return this.http.put<Task>(`${this.baseUrl}/update/${id}`, task, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

  deleteTask(id: number): Observable<void> {
  const token = localStorage.getItem('jwt');
  return this.http.delete<void>(`http://localhost:1423/task/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

}
