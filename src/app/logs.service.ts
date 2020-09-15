import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { TagInterface } from './interfaces/tag-interface';
import { LogInterface } from './interfaces/log-interface';
import { AbstractControl } from '@angular/forms';
import { mergeMap, switchMap, retry, map, catchError, filter, scan, tap, take, exhaustMap  } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';
import { User } from './app-login/user.model';



@Injectable({
  providedIn: 'root'
})
export class LogsService  {
  // contains the whole tag vector
  tags: string[] = ['nada'];
  loggedUser: User = null;

  constructor(private auth: AuthService, private http: HttpClient) {
    if (http === undefined) {
      console.log('HttpClient was not injected ');
    }
    this.auth.userLoggedIn.subscribe(u => {
      this.loggedUser = u;
      if(this.loggedUser!== null){
        this.initTagList();
      } // else delete the list
    });
  }

  // getTagList(): the user must be logged in, thus this function must be called each time a user logs in
  // 
  initTagList() {
    this.auth.userLoggedIn.pipe(
      map(
        // create a new tag list for this user
        user => {
          this.http.get<TagInterface[]>('http://localhost:8080/tags', {
            headers: new HttpHeaders().set('authorization', user.token),
            withCredentials: true, observe: 'body'})
          .pipe(
            map(tagList => {
              for (let i = 0; i < tagList.length; i++) {
                this.tags.push(tagList[i].name);
              }
            })
          )
          .subscribe();// http.get
        }) // user map
    )// subject's pipe
    .subscribe();
  }

  // receives a form submission with a log to be posted
  createLog(form: AbstractControl) {
    console.log('form: creation mode!!!', form.value);
    const { tag, title, lines } = form.value;
    const fileName = "filename.txt"
    this.http.post<LogInterface>("http://localhost:8080/logs", { tag, title, lines, fileName }, {
      // headers: new HttpHeaders({ 'withCredentials': 'true'}).set('authorization', temp.token),
      headers: new HttpHeaders().set('authorization', this.loggedUser.token),
      observe: 'body'
    }).
      subscribe(
        resp => { console.log('resp : ', resp) },
        error => { console.log('error: ', error) }
      );
  }

  // uses a PUT request to modify an existing log
  modifyLog(form: AbstractControl){
    console.log('form: modification mode!!!', form.value);
    const { tag, title, lines, id } = form.value;
    const fileName = "filename.txt"
    return this.http.post<LogInterface>("http://localhost:8080/logmod", { tag, title, lines, fileName }, {
      headers: new HttpHeaders().set('authorization', this.loggedUser.token),
      params: new HttpParams().set('id', id),
      observe: 'body'
    });
  }

// I'd rather have a stream and a transformer function for each log, not a global array of logs I'll have to go through
// TODO: add the logs by tag list in the search form
  getLogsByTag(tag: string) {
    return this.http.get<LogInterface[]>('http://localhost:8080/logs', {
      headers: new HttpHeaders().set('authorization', this.loggedUser.token),
      params: new HttpParams().set('tag', tag),
      withCredentials: true,
      observe: 'body'
    }) 
    // TODO: create a new array with a simple log (nolines) and return it in the observable to be listed for selection
    // .pipe(
    //   map(
    //     logs => {
    //       const slogs:any[]= [];
    //       console.log('getLogsbytag.log.title: ');
    //       for(let i = 0; i<logs.length; i++){
    //         // console.log('title: ', logs[i].title);
    //         slogs.push({'id': logs[i].id, 'tag': logs[i].tag, 'title': logs[i].title})

    //       }
    //     }
    //   )
    // );
  }

  // TODO: use the logs_by_tag list to find a log by id, thus it'll be unique
  getLogById(id: string) {
    return this.http.get<LogInterface>("http://localhost:8080/log", {
      headers: new HttpHeaders().set('authorization', this.loggedUser.token),
      params: new HttpParams().set('id', id)
    });
  }

  // update the local tag list
  getTags(beg: string) {
    console.log('logs.service::non-filtered tags: ', this.tags)
    let temp: string[] = [];
    for (let i in this.tags) {
      if (this.tags[i].startsWith(beg)) {
        temp.push(this.tags[i]);
      }
    }

    console.log('logs.service::filtered tags: ', temp)
    return temp;
  }
}
