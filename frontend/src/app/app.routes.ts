import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', title: 'Clínica Online', loadComponent: () => import('./features/home/home.page').then((m) => m.HomePage) },
  { path: 'cartilla', title: 'Cartilla | Clínica Online', data: { title: 'Cartilla médica', description: 'El directorio de profesionales migrará aquí en la siguiente fase.' }, loadComponent: () => import('./features/placeholder/placeholder.page').then((m) => m.PlaceholderPage) },
  { path: 'turnos', title: 'Turnos | Clínica Online', data: { title: 'Gestión de turnos', description: 'La agenda y sus reglas de disponibilidad se migrarán aquí.' }, loadComponent: () => import('./features/placeholder/placeholder.page').then((m) => m.PlaceholderPage) },
  { path: 'informes', title: 'Informes | Clínica Online', data: { title: 'Informes', description: 'Los indicadores y exportaciones vivirán en este módulo.' }, loadComponent: () => import('./features/placeholder/placeholder.page').then((m) => m.PlaceholderPage) },
  { path: 'acceso', title: 'Acceso | Clínica Online', data: { title: 'Acceso seguro', description: 'Supabase Auth sustituirá el login heredado y sus contraseñas en texto plano.' }, loadComponent: () => import('./features/placeholder/placeholder.page').then((m) => m.PlaceholderPage) },
  { path: '**', redirectTo: '' }
];
