import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms'
import { FormControl } from '@angular/forms';
import { LogsService } from '../../logs.service';
import { ActivatedRoute } from '@angular/router';
import { LogInterface } from '../../interfaces/log-interface';

@Component({
  selector: 'app-creation-form',
  templateUrl: './creation-form.component.html',
  styleUrls: ['./creation-form.component.css']
})
export class CreationFormComponent implements OnInit {
  
  createMode: boolean = false;
  creationForm: FormGroup;
  logId = null;
  log: LogInterface =  { id: "1", title: "the dofault log in the creation form", lines: "that the main part of the log: the text", tag: "music" };
  logs: LogInterface[] = [];

  constructor(private logsService: LogsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.creationForm = new FormGroup({
      'title': new FormControl('empty'),
      'tag': new FormControl('empty'),
      'id': new FormControl(),
      'lines': new FormControl('empty')
    });
    // get the id param from the route:
    // this.logId = this.route.snapshot.params['id'];
    // this.route.params.subscribe( ({id}) => this.logId = id);
    // // this.route.data.subscribe(li => this.logId = li);
    this.route.data.subscribe(data => {
      console.log('the log:', data);
      this.log = data.log;
    });

    
    // TODO: change to a obs<id>; update mode creation: createMode; 
    // console.log('the logId.value when there is not param sent to the creation form: ', this.logId);
    this.initForm(this.log);
  }
// this inits the form in the 'id as a param' case
// note: in that case we must manage the 'new' log case
  private initFormWithId(id: string) {
    if(id == 'new'){
      this.createMode = true;
    }
    if (id != null && this.createMode != true) {
      this.logsService.getLogById(id)
          .subscribe( l => {
            console.log('creation-form::log : ', l.lines);
            this.creationForm.get('title').patchValue(l.title);
            this.creationForm.get('id').patchValue(l.id);
            this.creationForm.get('tag').patchValue(l.tag);
            this.creationForm.get('lines').patchValue(l.lines);
            this.logId = l.id;
          });
    }
  }
  
// this inits the form in the 'log as a param' case, when a resolver waits for the log so...
// note: in that case the resolver manages the 'new log' case
  private initForm(l: LogInterface) {
    console.log('creation-form::log : ', l.lines);
    this.creationForm.get('title').patchValue(l.title);
    this.creationForm.get('id').patchValue(l.id);
    this.creationForm.get('tag').patchValue(l.tag);
    this.creationForm.get('lines').patchValue(l.lines);
    this.logId = l.id;
  }

  onTagSelected(tag: string) {
    // console.log('tag:',tag);
    this.creationForm.patchValue({ 'tag': tag });
  }

  onSubmit() {
    // console.log('form:', this.creationForm);
    if(this.createMode == true){
      this.logsService.createLog(this.creationForm);
    } else {
      this.logsService.modifyLog(this.creationForm)
      .subscribe( l => {
        console.log('creation-form::log : ', l.lines);
        this.creationForm.get('title').patchValue(l.title);
        this.creationForm.get('id').patchValue(l.id);
        this.creationForm.get('tag').patchValue(l.tag);
        this.creationForm.get('lines').patchValue(l.lines);
        this.logId = l.id;
      });
    }
  }
}
