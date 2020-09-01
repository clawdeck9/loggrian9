import { Component, OnInit } from '@angular/core';
import { LogsService } from '../../logs.service';
import { LogInterface } from 'src/app/interfaces/log-interface';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-log-search-home',
  templateUrl: './log-search-home.component.html',
  styleUrls: ['./log-search-home.component.css']
})
export class LogSearchHomeComponent implements OnInit {

  logs: LogInterface[] = [];
  log: LogInterface = null;

  constructor(private logsService: LogsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }
  
  onGetLogsByTag(tag: string){
    // no need to get logs by tag here
    // this.logsService.getLogsByTag(tag).subscribe(logs => this.logs = logs);

    // this.router.navigate(['../reader', {relativeTo: this.route}]);
    // add this to the button in template: [routerLink]="['/search/form', log.id]"
    // this.router.navigateByUrl('/search/bytag/music');// TODO: send the logs to the list
  }

  // onGetLogById(id: string){
  //   this.logsService.getLogById(id).subscribe(log => this.log = log);
  //   this.router.navigate(['creation']); 
  //   START: One way of using routerLink
  //    this.router.navigateByUrl(`${'app-customer-details'}/${rowVal.id}`); 
  //   and this: an obs from an ang lib sends the customer data 
  // ngOnInit() {
  //   this.route.data.subscribe((res) => {
  //       this.customerData = res;
  //   },
  // }

}
