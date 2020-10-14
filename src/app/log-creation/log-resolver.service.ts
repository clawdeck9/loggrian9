import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, exhaust, map, tap } from 'rxjs/operators';
import { LogInterface } from '../interfaces/log-interface';
import { LogsService } from '../logs.service';

@Injectable({
  providedIn: 'root'
})
export class LogResolverService implements Resolve<LogInterface>{

  constructor(private logsService: LogsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

    let id = route.params['id'];
    let tag = route.params['tag'];
    console.log('in resolver:  id:', id, 'tag:', tag);
    

    if(id != 'new' && tag == 'mod'){
      return this.logsService.getLogById(id);
    }

    if(tag != 'mod'){
      return this.logsService.getEmptyLog(id, tag);
    }
    // TODO: error?
    console.log('error in LogResolverService ');
    

  }
}
