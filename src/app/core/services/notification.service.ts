import { Injectable, signal } from '@angular/core';

export interface Notification {
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notification = signal<Notification | null>(null);

  showError(message: string) {
    this.notification.set({
      message,
      type: 'error'
    });
    this.clearAfterDelay();
  }

  showSuccess(message: string) {
    this.notification.set({
      message,
      type: 'success'
    });
    this.clearAfterDelay();
  }

  private clearAfterDelay(delay = 3000) {
    setTimeout(() => {
      this.notification.set(null);
    }, delay);
  }
}