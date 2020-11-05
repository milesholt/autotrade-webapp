import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

//import * as Buffer from "Buffer";


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

    // setInterval(() => {
    //   let url = 'https://raw.githubusercontent.com/milesholt/autotrade1/version2/core/data/CS.D.XLMUSD.TODAY.IP/CS.D.XLMUSD.TODAY.IP_streamdata.json';
    //   this.http.get(url, {responseType: 'text'}).subscribe((res) =>{
    //
    //      let base64 = res;
    //      let buff = this._base64ToArrayBuffer(base64);
    //      let string = this._arrayBufferToString(buff);
    //      let obj = JSON.parse(string);
    //      this.data = obj;
    //
    //   });
    // },10000);

  }

   _base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  _arrayBufferToString(buff) {
    return String.fromCharCode.apply(null, new Uint8Array(buff));
  }


}
