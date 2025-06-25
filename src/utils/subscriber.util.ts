import { Observable, Subscription } from 'rxjs';
export function subscribeWithHandler<T>(obs$: Observable<T>,onSuccess: (data: T) => void,onError?: (err:any) => void, onComplete?: () => void): Subscription {
  return obs$.subscribe({
    next: onSuccess,
    error: onError ?? defaultErrorHandler,
    complete: onComplete,
  });
}

// Optional default error handler
function defaultErrorHandler(error: any) {
  console.error('An error occurred:', error);
}
