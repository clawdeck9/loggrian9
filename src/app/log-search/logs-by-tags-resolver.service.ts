import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { LogInterface } from '../interfaces/log-interface';
import { PageInterface } from '../interfaces/page-interface';
import { LogsService } from '../logs.service';

@Injectable({
  providedIn: 'root'
})
export class LogsByTagsResolverService implements Resolve<PageInterface>{

  constructor(private logsService: LogsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    let tag = route.params['tag'];
    //by definition, we want the first page;
    //by definition, it's a new tag. the existing page must be forgotten;
    return this.logsService.fetchLogsByTagPage(tag, '0');
  }
}
