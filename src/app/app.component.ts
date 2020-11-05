import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'autotrade-web';
  data:any = {}

  constructor(private http: HttpClient){
  } 

  ngOnInit(){
  }

  ngAfterViewInit(){
      console.log('Loaded web app. Getting data...');
      this.getData();
  }

  getData(){
    let url = 'https://raw.githubusercontent.com/milesholt/autotrade1/version2/core/data/CS.D.XLMUSD.TODAY.IP_pricedata.json';
    this.http.get(url).subscribe((res) => this.data = res);
  }

}
