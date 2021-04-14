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

  // TODO: validation: can't get logs if tag is null or not equal to an existing tag
  ngOnInit() {
    this.tagSelectForm.get('tag').valueChanges.subscribe(tagValue => {
      if (tagValue != null) {
        if (tagValue.length >= 0) {
          this.filteredTags = [];
          this.filteredTags = this.logsService.getTags(tagValue);// ????
        }
      }
      // console.log('tag-list::filtTags:', this.filteredTags);
    });
  }


  onLogsByTitle() {
    // console.log('tagSelectForm:  ', this.tagSelectForm);
    this.router.navigateByUrl('search/bytitle/noTitle');
    console.log('title: ',this.tagSelectForm.get('tag').value);
    this.router.navigate(['search/bytitle', this.tagSelectForm.get('tag').value]);
    this.tagSelectForm.reset();
  }

  onLogsByTag() {
    // console.log('tagSelectForm:  ', this.tagSelectForm);
    this.router.navigate(['search/bytag', this.tagSelectForm.get('tag').value]);
    this.tagSelectForm.reset();
  }

  onTagSelected(tagItem: string){
    // console.log('tag-list::onTagselected() called, tagItem: ', tagItem);
    this.tagSelectForm.get('tag').patchValue(tagItem);
  }

  onSubmit(){

  }
}
