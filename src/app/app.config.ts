import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  // 1. Import 'importProvidersFrom'
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
// 2. Import 'provideAnimations' (để sửa lỗi MatSnackBar/Crash)
import { provideAnimations } from '@angular/platform-browser/animations';

import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
  withFetch,
} from '@angular/common/http';

// --- CÁC THAY ĐỔI MỚI CHO v18+ (SSR) ---
// 3. Import 'provideSsr' (để sửa lỗi Vercel/Deploy)
import { provideSsr } from '@angular/ssr';
// 4. Import file 'serverRoutes' (file app.routes.server.ts của bạn)
import { serverRoutes } from './app.routes.server';
// ------------------------------------

import { FormsModule } from '@angular/forms';
import { HttpErrorInterceptor } from './interceptors/http-errors.interceptor';
import { HttpHeadersInterceptor } from './interceptors/http-headers.interceptor';
import { GaugeModule } from 'angular-gauge';

export const appConfig: ApplicationConfig = {
  providers: [
    // 5. Cung cấp SSR và định nghĩa routes cho server (SỬA LỖI VERCEL)
    provideSsr({
      routes: serverRoutes,
    }),

    provideRouter(routes),
    provideClientHydration(),

    // 6. Cung cấp Animations (SỬA LỖI CRASH/ĐƠ)
    provideAnimations(),

    provideHttpClient(withInterceptorsFromDi(), withFetch()),

    // Import các module (cho SSR và Standalone)
    importProvidersFrom(FormsModule),
    importProvidersFrom(GaugeModule.forRoot()),

    // Đăng ký Interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeadersInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
};
