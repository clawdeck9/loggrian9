import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { TagInterface } from './interfaces/tag-interface';
import { LogInterface } from './interfaces/log-interface';
import { PageInterface } from './interfaces/page-interface';
import { AbstractControl } from '@angular/forms';
import { switchMap, retry, map, catchError, filter, scan, tap, take  } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { BehaviorSubject, EMPTY } from 'rxjs';
import { User } from './app-login/user.model';



@Injectable({
  providedIn: 'root'
})
export class LogsService  {
  // contains the whole tag vector
  tags: string[] = [''];
  // todo: change the Array to a Array of pages?
  logs: LogInterface[] = null;
  loggedUser: User = null;
  changedLogs = new BehaviorSubject<LogInterface[]>(this.logs);

  constructor(private auth: AuthService, private http: HttpClient) {
    if (http === undefined) {
      console.log('HttpClient was not injected ');
    }
    this.logs = [];
    this.auth.userLoggedIn.subscribe(u => {
      this.loggedUser = u;
      if(this.loggedUser!== null){
        this.initTagList();
      } // else delete the list
    });
  }

  setLogs(logs: LogInterface[]){
    this.logs = logs;
    // send data to subscribers
    this.changedLogs.next(logs);
  }

  getLogs(){
    return this.logs;
  }

  replaceLocalLog(log: LogInterface, newLog: LogInterface) {
    // console.log('replaceLocalLog::the logs before adding a new mod one:', this.logs.toString(), 'id:', log.id);
    let id: string = log.id;
    let index = -1;
    let l: LogInterface = null;
    for (l of this.logs) {
      index++;
      if (l.id == id) {
        this.logs.splice(index, 1);
      }
    }
    this.logs.push(newLog);
    this.changedLogs.next(this.logs);
  }

  addLocalLog(newLog: LogInterface){
    this.logs.push(newLog);
    this.changedLogs.next(this.logs);
  }
  // const index = myArray.indexOf(key, 0);
  // if (index > -1) {
  //    myArray.splice(index, 1);
  // }


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

  // todo
  fetchLogsByTagNextPage(tag: string){
    this.fetchLogsByTag(tag, 'o');
  }

  // todo
  fetchLogsByTagPrevPage(tag: string){
    this.fetchLogsByTag(tag, 'o');
  }

  // receives a form submission with a log to be posted
  createLog(form: AbstractControl) {
    console.log('form: creation mode!!!', form.value);
    const { tag, title, lines } = form.value;
    const fileName = "filename.txt"
    return this.http.post<LogInterface>("http://localhost:8080/logs", { tag, title, lines, fileName }, {
      // headers: new HttpHeaders({ 'withCredentials': 'true'}).set('authorization', temp.token),
      headers: new HttpHeaders().set('authorization', this.loggedUser.token),
      observe: 'body'
    });
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
  getLocalLogsByTag(tag: string) {
    if ((this.logs != null) && (this.logs.length > 0)){
      if (this.logs[0].tag == tag){
        return this.logs;
      }
    }
    return [];
  }


  _fetchLogsByTag(tag: string){
    return this.http.get<LogInterface[]>('http://localhost:8080/logs', {
      headers: new HttpHeaders().set('authorization', this.loggedUser.token),
      params: new HttpParams().set('tag', tag),
      withCredentials: true,
      observe: 'body'
    }).pipe(
      tap(
        data => this.setLogs(data)
      )
    );
  }
// gets some paged responses from the server
  fetchLogsByTag(tag: string, pageNumber: string='0'){
    return this.http.get<PageInterface>('http://localhost:8080/logs-paged', {
      headers: new HttpHeaders().set('authorization', this.loggedUser.token),
      params: new HttpParams().set('tag', tag).set('page', pageNumber).set('size', '10'),
      withCredentials: true,
      observe: 'body'
    }).pipe(

      tap(
        data => {
          console.log("fetchLogsByTag::data.content= " + data.content.toString());
          this.setLogs(data.content);
        }
      ),
      map(data => data.content)
    );
  }

  findLogsByTitle(title: string){
    console.log('title (in logsService): ', title);
    return this.http.get<LogInterface[]>('http://localhost:8080/logs', {
      headers: new HttpHeaders().set('authorization', this.loggedUser.token),
      params: new HttpParams().set('title', title),
      withCredentials: true,
      observe: 'body'
    })
  }

  getEmptyLog(i:string, t: string){
    let log: LogInterface =  { id: i, title: "", lines: "", tag: t };
    return log;
  }

  // TODO: use the logs_by_tag list to find a log by id, thus it'll be unique
  getLogById(id: string) {
    return this.http.get<LogInterface>("http://localhost:8080/log", {
      headers: new HttpHeaders().set('authorization', this.loggedUser.token),
      params: new HttpParams().set('id', id)
    }).pipe(
      catchError(error => {console.log('the error', error);
          return EMPTY;
    })
    );
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
