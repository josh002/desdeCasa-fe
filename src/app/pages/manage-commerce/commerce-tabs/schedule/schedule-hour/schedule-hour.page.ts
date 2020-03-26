import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-schedule-hour',
  templateUrl: './schedule-hour.page.html',
  styleUrls: ['./schedule-hour.page.scss'],
})
export class ScheduleHourPage implements OnInit {
    //datos usados en este componente
    name = 'Juan';
    lastName ='Gonzales';
    dni = '126548785';
    myArray = [1,2,3,4,5,6,87,9,8,7]

  constructor(
    public alertController: AlertController,
  ) { }

  ngOnInit() {
  }
  async myAppointment() {
    const alert = await this.alertController.create({
      header: 'Turno en supermercado',
      subHeader: 'Don Pepe',
      message: 'Horario : 8:15',
      cssClass: 'alert-commerce',
      buttons: ['OK']
    });
    await alert.present();
  }
}
