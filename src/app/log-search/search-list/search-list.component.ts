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
      console.log('subscription called: ', logs);
    })
    this.tag = this.route.snapshot.params['tag'];
    // this.logs = this.logService.getLocalLogsByTag('tag');
    
    this.route.data.subscribe( (i: Data) => {
      console.log('item: ', i); 
      this.logs = i['logsByTag']; 
      console.log('logs:@cb from resolver = ', this.logs);
    });

  }

  onGetLogById(id: string){
    console.log('search-list::onGetLogById(id)::id: ', id);
    
    // this.router.navigate(['../creation/1', { relativeTo: this.route}]);
    this.router.navigate(['/search/tags/form', id, 'mod']);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
