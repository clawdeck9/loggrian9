import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TagInterface } from 'src/app/interfaces/tag-interface';
import { LogsService } from 'src/app/logs.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css']
})
export class TagListComponent implements OnInit {

  filteredTags: string[] = null;

  tagSelectForm = new FormGroup({
    'tagList': new FormControl(),
    'tag': new FormControl()
  });

  constructor(private router: Router, private logsService: LogsService) { }

  ngOnInit() {
    this.tagSelectForm.get('tag').valueChanges.subscribe(tagValue => {
      if (tagValue.length > 0) {
        this.filteredTags = [];
        this.filteredTags = this.logsService.getTags(tagValue);
      }
      console.log('tag-list::filtTags:', this.filteredTags);
    });
  }

  onSubmit() {
    console.log('tagSelectForm:  ', this.tagSelectForm);
    // this.router.navigateByUrl('search/bytag/maison');
    this.router.navigate(['search/bytag', this.tagSelectForm.get('tag').value]);
  }

  onTagSelected(tagItem: string){
    // console.log('tag-list::onTagselected() called, tagItem: ', tagItem);
    this.tagSelectForm.get('tag').patchValue(tagItem);
  }
}
