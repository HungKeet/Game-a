import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
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
// 4. Import file 'serverRoutes' (file app.server.routes.ts của bạn)
import { serverRoutes } from './app.server.routes';
// ------------------------------------

import { FormsModule } from '@angular/forms';
import { HttpErrorInterceptor } from './interceptors/http-errors.interceptor';
import { HttpHeadersInterceptor } from './interceptors/http-headers.interceptor';
import { GaugeModule } from 'angular-gauge';

export const appConfig: ApplicationConfig = {
  providers: [
    provideSsr({
      routes: serverRoutes,
    }),

    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),

    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    importProvidersFrom(FormsModule),
    importProvidersFrom(GaugeModule.forRoot()),
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
