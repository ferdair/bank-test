import { HttpErrorResponse, HttpRequest, HttpHandlerFn, HttpEvent, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { NotificationService, Notification } from '@core/services/notification.service';
import { errorInterceptor } from './error.interceptor';
import { Signal, signal } from '@angular/core';

interface MockNotificationService {
  notification: ReturnType<typeof signal<Notification | null>>;
  showError: jest.Mock<void, [message: string]>;
  showSuccess: jest.Mock<void, [message: string]>;
  clearAfterDelay: jest.Mock<void, [delay?: number]>;
}

describe('ErrorInterceptor', () => {
  let notificationService: MockNotificationService;
  let httpHandlerMock: HttpHandlerFn;
  let request: HttpRequest<unknown>;

  beforeEach(() => {
    notificationService = {
      notification: signal<Notification | null>(null),
      showError: jest.fn().mockImplementation((message: string) => {
        notificationService.notification.set({
          message,
          type: 'error'
        });
      }),
      showSuccess: jest.fn(),
      clearAfterDelay: jest.fn()
    };
    
    TestBed.configureTestingModule({
      providers: [
        { provide: NotificationService, useValue: notificationService as unknown as NotificationService }
      ]
    });

    request = new HttpRequest('GET', '/api/test');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should pass through successful requests', (done) => {
    const response = new HttpResponse({
      body: { data: 'test' },
      status: 200
    });
    
    httpHandlerMock = () => of(response);

    TestBed.runInInjectionContext(() => {
      errorInterceptor(request, httpHandlerMock).subscribe({
        next: (result) => {
          expect(result).toEqual(response);
          expect(notificationService.showError).not.toHaveBeenCalled();
          expect(notificationService.notification()).toBeNull();
          done();
        }
      });
    });
  });

  it('should handle 400 Bad Request with custom message', (done) => {
    const errorResponse = new HttpErrorResponse({
      error: { message: 'Datos de usuario inválidos' },
      status: 400,
      statusText: 'Bad Request'
    });

    httpHandlerMock = () => throwError(() => errorResponse);

    TestBed.runInInjectionContext(() => {
      errorInterceptor(request, httpHandlerMock).subscribe({
        error: (error) => {
          expect(error).toBe(errorResponse);
          expect(notificationService.showError).toHaveBeenCalledWith('Datos de usuario inválidos');
          expect(notificationService.notification()).toEqual({
            message: 'Datos de usuario inválidos',
            type: 'error'
          });
          done();
        }
      });
    });
  });

  it('should handle 400 Bad Request with default message', (done) => {
    const errorResponse = new HttpErrorResponse({
      error: {},
      status: 400,
      statusText: 'Bad Request'
    });

    httpHandlerMock = () => throwError(() => errorResponse);

    TestBed.runInInjectionContext(() => {
      errorInterceptor(request, httpHandlerMock).subscribe({
        error: (error) => {
          expect(error).toBe(errorResponse);
          expect(notificationService.showError).toHaveBeenCalledWith('Datos inválidos');
          expect(notificationService.notification()).toEqual({
            message: 'Datos inválidos',
            type: 'error'
          });
          done();
        }
      });
    });
  });

  it('should handle 404 Not Found', (done) => {
    const errorResponse = new HttpErrorResponse({
      status: 404,
      statusText: 'Not Found'
    });

    httpHandlerMock = () => throwError(() => errorResponse);

    TestBed.runInInjectionContext(() => {
      errorInterceptor(request, httpHandlerMock).subscribe({
        error: (error) => {
          expect(error).toBe(errorResponse);
          expect(notificationService.showError).toHaveBeenCalledWith('Recurso no encontrado');
          expect(notificationService.notification()).toEqual({
            message: 'Recurso no encontrado',
            type: 'error'
          });
          done();
        }
      });
    });
  });

  it('should handle 500 Server Error', (done) => {
    const errorResponse = new HttpErrorResponse({
      status: 500,
      statusText: 'Internal Server Error'
    });

    httpHandlerMock = () => throwError(() => errorResponse);

    TestBed.runInInjectionContext(() => {
      errorInterceptor(request, httpHandlerMock).subscribe({
        error: (error) => {
          expect(error).toBe(errorResponse);
          expect(notificationService.showError).toHaveBeenCalledWith('Error en el servidor');
          expect(notificationService.notification()).toEqual({
            message: 'Error en el servidor',
            type: 'error'
          });
          done();
        }
      });
    });
  });

  it('should handle connection error (status 0)', (done) => {
    const errorResponse = new HttpErrorResponse({
      status: 0,
      statusText: 'Unknown Error'
    });

    httpHandlerMock = () => throwError(() => errorResponse);

    TestBed.runInInjectionContext(() => {
      errorInterceptor(request, httpHandlerMock).subscribe({
        error: (error) => {
          expect(error).toBe(errorResponse);
          expect(notificationService.showError).toHaveBeenCalledWith('Error de conexión');
          expect(notificationService.notification()).toEqual({
            message: 'Error de conexión',
            type: 'error'
          });
          done();
        }
      });
    });
  });

  it('should handle generic error with default message', (done) => {
    const errorResponse = new HttpErrorResponse({
      status: 418,
      statusText: 'I\'m a teapot'
    });

    httpHandlerMock = () => throwError(() => errorResponse);

    TestBed.runInInjectionContext(() => {
      errorInterceptor(request, httpHandlerMock).subscribe({
        error: (error) => {
          expect(error).toBe(errorResponse);
          expect(notificationService.showError).toHaveBeenCalledWith('Ha ocurrido un error');
          expect(notificationService.notification()).toEqual({
            message: 'Ha ocurrido un error',
            type: 'error'
          });
          done();
        }
      });
    });
  });

  it('should handle non-HttpErrorResponse errors', (done) => {
    const error = new Error('Random error');
    httpHandlerMock = () => throwError(() => error);

    TestBed.runInInjectionContext(() => {
      errorInterceptor(request, httpHandlerMock).subscribe({
        error: (resultError) => {
          expect(resultError).toBe(error);
          expect(notificationService.showError).not.toHaveBeenCalled();
          expect(notificationService.notification()).toBeNull();
          done();
        }
      });
    });
  });
});