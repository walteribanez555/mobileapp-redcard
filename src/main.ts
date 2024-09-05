import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { register as registerSwiperElements } from 'swiper/element/bundle';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './app/data/interceptor/error.interceptor';
import { sessionInterceptor } from './app/data/interceptor/session.interceptor';






registerSwiperElements();


bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient( withInterceptors([errorInterceptor, sessionInterceptor]))
  ],
});
