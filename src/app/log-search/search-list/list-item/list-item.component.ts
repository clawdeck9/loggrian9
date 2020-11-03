import { Component, Input, OnInit } from '@angular/core';
import { LogInterface } from 'src/app/interfaces/log-interface';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  @Input() log: LogInterface;

  constructor() { }

  ngOnInit(): void {
  }

}
