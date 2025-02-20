import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    jest.useFakeTimers();
    TestBed.configureTestingModule({
      providers: [NotificationService]
    });
    service = TestBed.inject(NotificationService);
    service.notification.set(null);
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with null notification', () => {
    expect(service.notification()).toBeNull();
  });

  describe('showError', () => {
    it('should set error notification with correct message', () => {
      const errorMessage = 'Test error message';
      
      service.showError(errorMessage);
      
      expect(service.notification()).toEqual({
        message: errorMessage,
        type: 'error'
      });
    });

    it('should clear error notification after default delay', () => {
      service.showError('Test error');
      
      expect(service.notification()).not.toBeNull();
      
      jest.advanceTimersByTime(3000);
      
      expect(service.notification()).toBeNull();
    });
  });

  describe('showSuccess', () => {
    it('should set success notification with correct message', () => {
      const successMessage = 'Test success message';
      
      service.showSuccess(successMessage);
      
      expect(service.notification()).toEqual({
        message: successMessage,
        type: 'success'
      });
    });

    it('should clear success notification after default delay', () => {
      service.showSuccess('Test success');
      
      expect(service.notification()).not.toBeNull();
      
      jest.advanceTimersByTime(3000);
      
      expect(service.notification()).toBeNull();
    });
  });

  describe('clearAfterDelay', () => {
    it('should clear notification after custom delay', () => {
      service.showSuccess('Test message');
      
      jest.advanceTimersByTime(2000);
      expect(service.notification()).not.toBeNull();
      
      jest.advanceTimersByTime(1000);
      expect(service.notification()).toBeNull();
    });

    it('should handle multiple notifications correctly', () => {
      service.showError('First error');
      
      jest.advanceTimersByTime(1500);
      
      service.showSuccess('Override with success');
      
      expect(service.notification()).toEqual({
        message: 'Override with success',
        type: 'success'
      });
      
      jest.advanceTimersByTime(3000);
      
      expect(service.notification()).toBeNull();
    });
  });
});