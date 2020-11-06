import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import GitHub from 'github-api';
import { Octokit } from "@octokit/core";
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

  gh = new GitHub();
  //c884072821024093ad3ecdb8508b1b86c8eabbc5
  //166cce69f268d4817662d8c40790c00797cbb443
  //Authenticate with Personal Access Token from Github Developer Settings
  //Dont put as string otherwise it will delete the token!
  octokit = new Octokit({ auth: process.env.GIT_PERSONAL_ACCESS_TOKEN });
  owner = 'milesholt';
  branch = 'version2';
  repo = 'autotrade1';
  sha = 0;
  path = 'core/data/CS.D.XLMUSD.TODAY.IP/CS.D.XLMUSD.TODAY.IP_streamdata.json';

  constructor(private http: HttpClient){
  }

  ngOnInit(){
  }

  async ngAfterViewInit(){
      console.log('Loaded web app. Getting data...');
      //this.getData();
      this.go();
  }

  async go(){
    await this.getFile(this.path);

    await this.wait(10000).then(r => {
      this.go();
    });
  }

  async wait(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  //Get file
  //Use If-None-Match to flush cache
  async getFile(path){
    console.log('Getting file from github');
    console.log(path);
    const result:any = await this.octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner: this.owner,
      repo: this.repo,
      path: this.path,
      ref: this.branch,
      headers: {
      'If-None-Match': ''
      }
    }).catch(e => {
      console.log(e);
    });

    //console.log(result.data.content);
    this.sha = result.data.sha;
    console.log('getting file, sha is now:' + this.sha);
    //decode data from base64 string to object

    let base64 = result.data.content;
    let buff = this._base64ToArrayBuffer(base64);
    let string = this._arrayBufferToString(buff);


    console.log(string);
    let buff2 = this._base64ToArrayBuffer(string);
    let string2 = this._arrayBufferToString(buff2);
    console.log(string2);
    let obj = JSON.parse(string2);
    this.data = obj;

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
