import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphqlModule } from './graphql/graphql.module';
import { LayoutModule } from './layout/layout.module';
import { HttpClientInterceptor } from './shared/interceptors/http.client.interceptor';
import { HttpJwtInterceptor } from './shared/interceptors/http.jwt.interceptor';
import { ServiceWorkerModule, SwUpdate } from '@angular/service-worker';
import { environment } from '@env';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { MessagingService } from '@shared/services/messaging.service';
// import { initializeApp } from "firebase/app";
// initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastModule,
    AppRoutingModule,
    GraphqlModule,
    LayoutModule,
    HttpClientModule, 
    // AngularFireMessagingModule,
    // AngularFireModule.initializeApp(environment.firebase),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: true }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireMessagingModule,

  ],
  providers: [
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpClientInterceptor,
      multi: true,
    },
    // check response 403 return home and require
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpJwtInterceptor,
      multi: true,
    },
    CookieService,
    MessagingService,
    SwUpdate
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
