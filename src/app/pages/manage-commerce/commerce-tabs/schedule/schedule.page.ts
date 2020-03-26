import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
    list = [7, 9, 11, 13, 15, 17, 19, 21, 22, 23];
  constructor() { }

  ngOnInit() {
  }


}
