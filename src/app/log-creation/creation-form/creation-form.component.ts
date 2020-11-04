import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms'
import { FormControl } from '@angular/forms';
import { LogsService } from '../../logs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LogInterface } from '../../interfaces/log-interface';

@Component({
  selector: 'app-creation-form',
  templateUrl: './creation-form.component.html',
  styleUrls: ['./creation-form.component.css']
})
export class CreationFormComponent implements OnInit {
  
  creationForm: FormGroup;
  log: LogInterface =  null;
  logs: LogInterface[] = [];

  constructor(private logsService: LogsService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.creationForm = new FormGroup({
      'title': new FormControl('empty'),
      'tag': new FormControl('noTag'),
      'id': new FormControl('new'),
      'lines': new FormControl('empty')
    });
    // this.logId = this.route.snapshot.params['id'];
    this.log = this.route.snapshot.data.log;
    
    this.route.data.subscribe(data => {
      this.log = data.log;
      this.initForm(this.log);
    });
      console.log('CreationFormComponent::log:', this.log);
    // TODO: add an exception
    console.log('CreationFormComponent::oninit: the url was incoherent');

  }


  
// this inits the form in the 'log as a param' case, when a resolver waits for the log so...
// note: in that case the resolver manages the 'new log' case
  private initForm(l: LogInterface) {
    console.log('creation-form::log : ', l.lines);
    this.creationForm.get('title').patchValue(l.title);
    this.creationForm.get('id').patchValue(l.id);
    this.creationForm.get('tag').patchValue(l.tag);
    this.creationForm.get('lines').patchValue(l.lines);
  }

  private resetLog(){
    this.log.id = 'new';
    this.log.lines = '';
    this.log.tag = 'noTag';
    this.log.title = '';
  }
  onTagSelected(tag: string) {
    // console.log('tag:',tag);
    this.creationForm.patchValue({ 'tag': tag });
  }



  onSubmit() {
    let newId: string = null;
    if(this.log.id == 'new'){
    console.log('form: createLog() call:', this.creationForm);
      this.logsService.createLog(this.creationForm);
    } else {
      console.log('form: modifyLog() call:', this.creationForm);
      this.logsService.modifyLog(this.creationForm)
      .subscribe( l => {
        // TODO: manage errors
        // this.initForm(l);
      });
    }
    // TODO: reset the logsByTag list before this, the comp is not updated because the route has not changed
    this.router.navigate(['search/bytag', this.creationForm.get('tag').value]);
  }
}
