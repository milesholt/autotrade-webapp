import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

//   private httpOptions = {
//   headers: new HttpHeaders({
//     'Accept': 'text/html, application/xhtml+xml, */*',
//     'Content-Type': 'application/x-www-form-urlencoded'
//   }),
//   responseType: 'text'
// };

  constructor(private http: HttpClient){
  }

  ngOnInit(){
  }

  ngAfterViewInit(){
      console.log('Loaded web app. Getting data...');
      this.getData();
  }

  getData(){
    // setInterval(() => {
    //   let url = 'https://raw.githubusercontent.com/milesholt/autotrade1/version2/core/data/CS.D.XLMUSD.TODAY.IP/CS.D.XLMUSD.TODAY.IP_streamdata.json';
    //   this.http.get(url, {responseType: 'text'}).subscribe((res) =>{
    //
    //      let buff = new Buffer.from(res, 'base64');
    //      let string = buff.toString('ascii');
    //      let obj = JSON.parse(string);
    //      console.log(obj);
    //      this.data = obj;
    //   });
    // },10000);

  }

}
