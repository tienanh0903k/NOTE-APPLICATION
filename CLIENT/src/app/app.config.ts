import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

// Routes
import { appRoutes } from './app.routes';

// Interceptors (nếu bạn cần)
// import { authInterceptor } from './core/interceptors/auth.interceptor';

// Material (tùy chọn)
// import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

// Environment
import { ApplicationConfig } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([])), // Thêm interceptor nếu có sau này
    // {
    //   provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
    //   useValue: {
    //     duration: 5000,
    //     horizontalPosition: 'end',
    //     verticalPosition: 'top',
    //   },
    // },
  ],
};

// Biến API_URL (nếu bạn muốn export để dùng ở nơi khác)
// export const API_URL: string = environment.apiUrl;