import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-get-appointment',
  templateUrl: './get-appointment.page.html',
  styleUrls: ['./get-appointment.page.scss'],
})
export class GetAppointmentPage implements OnInit {
    list = [7 , 9, 11, 13, 15, 17, 19, 21, 23 ];
  constructor() { }

  ngOnInit() {
  }

}
