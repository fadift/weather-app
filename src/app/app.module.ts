import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodayComponent } from './pages/today/today.component';
import { PlacesAutocompleteDirective } from './directives/places-autocomplete.directive';

@NgModule({
  declarations: [
    AppComponent,
    TodayComponent,
    PlacesAutocompleteDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
