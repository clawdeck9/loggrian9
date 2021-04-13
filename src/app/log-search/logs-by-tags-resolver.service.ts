import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { LogInterface } from '../interfaces/log-interface';
import { PageInterface } from '../interfaces/page-interface';
import { LogsService } from '../logs.service';

@Injectable({
  providedIn: 'root'
})
export class LogsByTagsResolverService implements Resolve<LogInterface[]>{

  constructor(private logsService: LogsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    let tag = route.params['tag'];
    let page = route.params['page'];
    let logs: LogInterface[] = null;
    // there'll be a necessary adaptation to paging functionality here
    logs = this.logsService.getLocalLogsByTag(tag);
    if (logs.length == 0){
      return this.logsService.fetchLogsByTag(tag, page);
    } else {
      return logs;
    }
  }
}
