import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object // 3. Inject PLATFORM_ID
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Đã có lỗi không xác định xảy ra!';
        if (isPlatformBrowser(this.platformId) && error.error instanceof ErrorEvent) {
          errorMessage = `Lỗi Client: ${error.error.message}`;
        } else {
          errorMessage = `Mã lỗi: ${error.status}\nNội dung: ${error.message}`;
        }

        console.error(errorMessage);
        if (isPlatformBrowser(this.platformId)) {
          this.snackBar.open(errorMessage, 'Đóng', {
            duration: 5000,
            panelClass: ['error-snackbar'],
          });

          if (error.status === 401) {
            this.router.navigate(['/login']);
          }
        }

        return throwError(() => error);
      })
    );
  }
}
