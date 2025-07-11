import { Injectable } from '@angular/core';
import { Auth } from '../Class/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:1423/auth';

  constructor(private http: HttpClient) {}

  register(data: Auth): Observable<any> {
  return this.http.post(`${this.baseUrl}/register`, data, {
    responseType: 'text' as 'json' // ✅ Accept plain string response
  });
}


  login(data: Auth): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, data);
  }

  storeToken(token: string): void {
    localStorage.setItem('jwt', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  logout(): void {
    localStorage.removeItem('jwt');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt');
  }
  
}
