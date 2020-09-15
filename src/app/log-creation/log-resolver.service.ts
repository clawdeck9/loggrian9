import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { LogInterface } from '../interfaces/log-interface';
import { LogsService } from '../logs.service';

@Injectable({
  providedIn: 'root'
})
export class LogResolverService implements Resolve<LogInterface>{

  constructor(private route: ActivatedRoute, private logsService: LogsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

    let id = route.params['id'];
    // const {'id'} = route.params;
    return this.logsService.getLogById(id);

  }
}
