import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { PositionComponent } from './position/position.component';
import { MessagesComponent } from './messages/messages.component';
import { PositionDetailComponent } from './position-detail/position-detail.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { CandidateDetailComponent } from './candidate-detail/candidate-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    PositionComponent,
    MessagesComponent,
    PositionDetailComponent,
    CandidatesComponent,
    CandidateDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false })  //mock http server. intercepts requests and returns simulated responses
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
