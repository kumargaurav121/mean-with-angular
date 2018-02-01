import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth.service';
import { BlogService } from './services/blog.service';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './auth/auth.gaurd';
import { NotAuthGuard } from './auth/notAuth.guard';
import { BlogComponent } from './blog/blog.component';
import { EditBlogComponent } from './blog/edit-blog/edit-blog.component';
import { DeleteBlogComponent } from './blog/delete-blog/delete-blog.component';
import { PublicProfileComponent } from './public-profile/public-profile.component';

const appRoute : Routes = [
  {path: "", component: HomeComponent},
  {path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard]},
  {path: "register", component: RegisterComponent, canActivate: [NotAuthGuard]},
  {path: "login", component: LoginComponent, canActivate: [NotAuthGuard]},
  {path: "profile", component: ProfileComponent, canActivate: [AuthGuard]},
  {path: "blog", component: BlogComponent, canActivate: [AuthGuard]},
  {path: "edit-blog/:id", component: EditBlogComponent, canActivate: [AuthGuard]},
  {path: 'delete-blog/:id', component: DeleteBlogComponent, canActivate: [AuthGuard]},
  {path: 'public-profile/:username', component: PublicProfileComponent, canActivate: [AuthGuard]},
  {path: "**", component: HomeComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    BlogComponent,
    EditBlogComponent,
    DeleteBlogComponent,
    PublicProfileComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoute),
    HttpModule,
    FormsModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuard,
    NotAuthGuard,
    BlogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
