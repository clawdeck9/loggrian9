import { Component, OnInit } from '@angular/core';
import { LogsService } from '../../logs.service';



@Component({
  selector: 'app-log-creation-form',
  templateUrl: './log-creation-form.component.html',
  styleUrls: ['./log-creation-form.component.css']
})
export class LogCreationFormComponent implements OnInit {

  constructor(private service: LogsService) { }

  log: any;
  errorLog: any;

  ngOnInit() {
  }

  onTestSubject(){
  }
  onPostFBLog(){
    if(this.service===undefined) console.log('the service is undefined in the formComponent');
    this.service.postASampleLog();
  }

  // fetch some data from jwt securtiy app
  onGetFilteredTags(beg: string){
    // this.service.getFilteredTagList(beg).subscribe(
    //   resp =>  {this.log = resp}, 
    //   error => {
    //     this.errorLog = error;
    //     console.log('error message ', error.message);
    //   }
    // );
  }

  // fetch the tags in API and store them in the logsService
  onGetTags(){
    if(this.service===undefined) console.log('the service is undefined in the formComponent');
    this.service.initTagList();
  }
  

  onGetALog(){
    console.log('a log from the server: ', this.service.getLogById('3'));
  }

  // TODO: add a tag name as param to get a list of logs
  onGetLogs(){
    if(this.service===undefined) console.log('the service is undefined in the formComponent');

    console.log('logs from the server: ');

    this.service.getLogsByTag('ads').subscribe(
      resp =>  {() => console.log('end od logs ')}, 
      error => {
        this.errorLog = error;
        console.log('error message ', error.message);
      });
  }
}
