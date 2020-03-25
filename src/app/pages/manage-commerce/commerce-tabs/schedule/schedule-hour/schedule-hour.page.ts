import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-schedule-hour',
  templateUrl: './schedule-hour.page.html',
  styleUrls: ['./schedule-hour.page.scss'],
})
export class ScheduleHourPage implements OnInit {

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
      buttons: ['Cancelar Turno', 'OK']
    });
    await alert.present();
  }
}
