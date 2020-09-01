import { Component, OnInit, Input } from '@angular/core';
import { LogInterface } from 'src/app/interfaces/log-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { LogsService } from 'src/app/logs.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {

  tag: string = null;
  log: LogInterface = null;
  logs: LogInterface[] = null;

  // logs: LogInterface[] = [
  //   { id: "1", title: "Testing the first creation form", lines: "that the main part of the log: the text", tag: "music" },
  //   { id: "2", title: "Testing the second creation form", lines: "that the main part of the log: the text", tag: "music" },
  //   { id: "3", title: "Testing the third creation form", lines: "that the main part of the log: the text", tag: "music" },
  // ];

  constructor(private route: ActivatedRoute, private router: Router, private logService: LogsService) { }

  ngOnInit() {
    this.tag = this.route.snapshot.params['tag'];
    this.onGetLogsByTag();
  }

  onGetLogsByTag(){
    this.logService.getLogsByTag(this.tag).subscribe(ls => this.logs = ls);
  }

  onGetLogById(id: string){
    // this.router.navigate(['../creation/1', { relativeTo: this.route}]);
    this.router.navigate(['/search/creation', id]);
  }

}
