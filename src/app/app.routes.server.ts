import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Đây là file định nghĩa các route cho Server-Side Rendering (SSR).
 * Chúng ta phải "bảo" cho Angular biết route nào là động (cần SSR)
 * và route nào là tĩnh (có thể Prerender).
 */
export const serverRoutes: ServerRoute[] = [
  {
    // Đây là route động (Dynamic) -> Phải dùng SSR
    path: 'search/:game-search',
    renderMode: RenderMode.SSR,
  },
  {
    // Đây cũng là route động -> Phải dùng SSR
    path: 'details/:id',
    renderMode: RenderMode.SSR,
  },
  {
    // Đây là trang chủ (Static) -> Dùng Prerender để tăng tốc SEO
    path: '',
    renderMode: RenderMode.Prerender,
  },
];
