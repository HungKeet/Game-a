import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

// 1. IMPORT "NO-OP" ANIMATIONS
// Đây là bản sửa lỗi cho "@angular/animations/browser"
import { provideNoopAnimations } from '@angular/platform-browser/animations';

const serverConfig: ApplicationConfig = {
  providers: [
    // 2. Sửa lỗi Vercel/Routes (giống như code của bạn)
    provideServerRendering(withRoutes(serverRoutes)),
    
    // 3. SỬA LỖI ANIMATIONS
    // Lệnh này sẽ ghi đè (override) lên provideAnimations() 
    // của file app.config.ts, và sửa lỗi build animations
    provideNoopAnimations()
  ]
};

// Gộp 2 file config lại
export const config = mergeApplicationConfig(appConfig, serverConfig);
