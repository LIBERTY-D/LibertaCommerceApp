import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastData, Type } from '../types/toast.type';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new BehaviorSubject<ToastData | null>(null);

  showToast(message: string, type: Type = 'success', time = 5000) {
    this.toastSubject.next({ message, type });
    setTimeout(() => this.clearToast(), time);
  }

  clearToast() {
    this.toastSubject.next(null);
  }

  getToast(): Observable<ToastData | null> {
    return this.toastSubject.asObservable();
  }
}
