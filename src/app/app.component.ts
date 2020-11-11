import { Component, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MatTable} from '@angular/material/table';


import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import GitHub from 'github-api';
import { Octokit } from "@octokit/core";
//import * as Buffer from "Buffer";

import { environment } from './../environments/environment';

const data:any = [];
const title = 'autotrade-web';

@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild(MatTable, { static: false }) table: MatTable<any>;

  displayedColumns: string[] = ['epic', 'closeAsk', 'closeBid', 'newLimit', 'stopLevel', 'updated','amount'];
  dataSource = data;

  gh = new GitHub();
  //c884072821024093ad3ecdb8508b1b86c8eabbc5
  //166cce69f268d4817662d8c40790c00797cbb443
  //Authenticate with Personal Access Token from Github Developer Settings
  //Dont put as string otherwise it will delete the token!
  //octokit = new Octokit({ auth: process.env.GIT_PERSONAL_ACCESS_TOKEN });

  octokit = new Octokit({ auth: environment.git_token })
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
      console.log(environment);

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
    this.dataSource = [];
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
    let obj = JSON.parse(string);

    //calc ammount
    let size = 50;
    let close =  obj.direction == 'SELL' ? obj.closeAsk : obj.closeBid;
    let amount = (obj.openLevel - close) * size;
    obj.amount = amount;

    //render table
    this.dataSource.push(obj);
    this.table.renderRows();

    console.log(this.dataSource);

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
