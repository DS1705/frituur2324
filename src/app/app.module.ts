import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from "@angular/router";

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MessageComponent } from './message/message.component';
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../environments/environment";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {CurrencyPipe} from "@angular/common";
import {MessageService} from "./message.service";
import {MenuPageComponent} from "./menu-page/menu-page.component";
import { SearchPipe } from './search.pipe';
import { ItembycategoryPipe } from './itembycategory.pipe';

const routes: Routes = [
  {path: 'category/:id', component: MenuPageComponent},
  {path:'',component:HomeComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    HomeComponent,
    MenuPageComponent,
    MessageComponent,
    SearchPipe,
    ItembycategoryPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    provideFirebaseApp(()=>initializeApp(environment.firebase)),
    provideFirestore(()=>getFirestore()),
    provideAuth(()=>getAuth())
  ],
  providers: [CurrencyPipe,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
