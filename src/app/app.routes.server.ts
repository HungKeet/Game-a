import { RenderMode, ServerRoute } from '@angular/ssr';


export const serverRoutes: ServerRoute[] = [
  {
   
    path: 'search/:game-search',
    renderMode: RenderMode.SSR,
  },
  {
    path: 'details/:id',
    renderMode: RenderMode.SSR,
  },
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
];
