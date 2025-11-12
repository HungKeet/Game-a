import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedReq = req.clone({
      // 1. Xóa hoàn toàn 'setHeaders' của RapidAPI
      setHeaders: {
        // (Bạn có thể giữ lại Content-Type nếu muốn)
        'Content-Type': 'application/json',
      },

      // 2. Thêm 'setParams' để gửi key của RAWG
      setParams: {
        key: 'e40e743af2c94b0c916a8aa618fb4473', // Đây là key RAWG của bạn
      },
    });
    return next.handle(clonedReq);
  }
}
