import { Component, OnInit } from '@angular/core';
import { welcomeText } from 'src/app/constants/constants';
import { AlertService } from 'src/app/services/alertService';

@Component({
  selector: 'app-register-complete',
  templateUrl: './register-complete.page.html',
  styleUrls: ['./register-complete.page.scss'],
})
export class RegisterCompletePage implements OnInit {

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.alertService.simpleAlert(welcomeText);
  }

}
