import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms'
import { FormControl } from '@angular/forms';
import { LogsService } from '../../logs.service';
import { ActivatedRoute } from '@angular/router';
import { LogInterface } from '../../interfaces/log-interface';
import { Plugins } from 'protractor/built/plugins';

@Component({
  selector: 'app-creation-form',
  templateUrl: './creation-form.component.html',
  styleUrls: ['./creation-form.component.css']
})
export class CreationFormComponent implements OnInit {
  
  createMode: boolean = true;
  creationForm: FormGroup;
  logId = null;
  log: LogInterface =  { id: "1", title: "Testing the first creation form", lines: "that the main part of the log: the text", tag: "music" };
  logs: LogInterface[] = [];

  constructor(private logsService: LogsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.creationForm = new FormGroup({
      'title': new FormControl('nothing here'),
      'tag': new FormControl('nada'),
      'id': new FormControl(),
      'lines': new FormControl('vide sidéral')
    });
    // get the id param from the route:
    this.logId = this.route.snapshot.params['id'];
    console.log('the logId.value when there is not param sent to the creation form: ', this.logId);
    this.initForm(this.logId);
  }

  // the formControl do not exist, not created onInit(), but created here with or without a Log
  private initForm(id: string) {
    if (id != null) {
      this.logsService.getLogById(id)
          .subscribe( l => {
            console.log('creation-form::log : ', l.lines);
            this.creationForm.get('title').patchValue(l.title);
            this.creationForm.get('id').patchValue(l.id);
            this.creationForm.get('tag').patchValue(l.tag);
            this.creationForm.get('lines').patchValue(l.lines);
          });
    }
  }

  onTagSelected(tag: string) {
    // console.log('tag:',tag);
    this.creationForm.patchValue({ 'tag': tag });
  }

  onSubmit() {
    // console.log('form:', this.creationForm);
    this.logsService.createLog(this.creationForm);
  }
}
