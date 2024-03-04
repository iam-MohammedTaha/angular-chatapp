import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './components/login/login.component';
import { LandingComponent } from './components/landing/landing.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { MatMenuModule } from '@angular/material/menu';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getStorage, provideStorage} from '@angular/fire/storage';
import { getFirestore, provideFirestore} from '@angular/fire/firestore';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule} from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { DateDisplayPipe } from './pipes/date-display.pipe'
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingComponent,
    HomeComponent,
    SignUpComponent,
    ProfileComponent,
    DateDisplayPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    MatMenuModule,
    MatAutocompleteModule,
    MatListModule,
    MatDividerModule,
    provideFirebaseApp(() => initializeApp({"projectId":"angular-signup-6cb86","appId":"1:382230531281:web:fed16ebd24402f20ea09f0","storageBucket":"angular-signup-6cb86.appspot.com","apiKey":"AIzaSyDlN9mmJyEqqXhxPXSUkxIS7feuKO2smik","authDomain":"angular-signup-6cb86.firebaseapp.com","messagingSenderId":"382230531281"})), //"locationId":"us-central"
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [
    DatePipe,
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
