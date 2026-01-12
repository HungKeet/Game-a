import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideServerRouting } from '@angular/ssr'; // Chuẩn v19
import { routes } from './app.routes';
import { serverRoutes } from './app.routes.server';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideServerRouting(serverRoutes),
    provideRouter(routes),
    provideHttpClient(withFetch()),
  ],
};
