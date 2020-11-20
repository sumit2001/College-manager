import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
// import { HttpModule } from '@angular/http';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    TeacherComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // AngularFontAwesomeModule,
    // FormBuilder,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([

      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'teacher', component: TeacherComponent },
      { path: 'student', component: StudentComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {


 }
