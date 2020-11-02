import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { LogInterface } from '../interfaces/log-interface';
import { LogsService } from '../logs.service';

@Injectable({
  providedIn: 'root'
})
export class LogsByTagsResolverService implements Resolve<LogInterface[]>{

  constructor(private logsService: LogsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    let tag = route.params['tag'];
    return this.logsService.getLogsByTag(tag);
  }
}
