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

  onNewLog(){
    // this.router.navigateByUrl('/search/creation/new');
    this.router.navigate(['/search/tags/form', "new"]);
  }
}
