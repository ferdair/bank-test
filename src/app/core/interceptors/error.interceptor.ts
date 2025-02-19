import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '@core/services/notification.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse) {
        let errorMessage = 'Ha ocurrido un error';
        
        switch (error.status) {
          case 400:
            errorMessage = error.error?.message || 'Datos inválidos';
            break;
          case 404:
            errorMessage = 'Recurso no encontrado';
            break;
          case 500:
            errorMessage = 'Error en el servidor';
            break;
          case 0:
            errorMessage = 'Error de conexión';
            break;
        }

        notificationService.showError(errorMessage);
      }

      return throwError(() => error);
    })
  );
};