import { Component, OnInit, Input } from '@angular/core';
import { LogInterface } from 'src/app/interfaces/log-interface';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { LogsService } from 'src/app/logs.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {

  tag: string = null;
  log: LogInterface = null;
  subscription: Subscription;
  logs: LogInterface[] = null;

  constructor(private route: ActivatedRoute, private router: Router, private logService: LogsService) { }

  ngOnInit() {
    this.subscription = this.logService.changedLogs.subscribe(logs => {
      this.logs = logs;
      console.log('subscription called (not the route.data!): ', logs);
    })
    this.tag = this.route.snapshot.params['tag'];
    // this can be overviewed, actually, the log array is sent through a behavSubject directly from the servicenpm
    this.route.data.subscribe((d: Data) => {
      console.log('item: ', d);
      this.logs = d['logsByTag'];
      console.log('logs:cb from resolver (NOT the subject subscription!)= ', this.logs);
    });
  }

  onGetLogById(id: string) {
    console.log('search-list::onGetLogById(id)::id: ', id);

    // this.router.navigate(['../creation/1', { relativeTo: this.route}]);
    this.router.navigate(['/search/tags/form', id, 'mod']);
  }

  // onNewLog(tag){
  //   if(tag == null){
  //     tag = "notag";
  //   }
  //   this.router.navigate(['/search/creation'])
  // }
  onNewLog() {
    if (this.tag == "" || this.tag == null) {
      this.tag = "noTag";
    }
    this.router.navigate(['/search/bytag', this.tag, 'creation', 'form', 'new', this.tag]);
  }
  // http://localhost:4200/search/bytag/programming/creation/form/29/mod
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
