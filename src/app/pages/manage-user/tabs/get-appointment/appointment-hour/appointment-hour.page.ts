import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-appointment-hour',
  templateUrl: './appointment-hour.page.html',
  styleUrls: ['./appointment-hour.page.scss'],
})
export class AppointmentHourPage implements OnInit {

  constructor(
    public alertController: AlertController,
  ) { }

  ngOnInit() {
  }
  async confirm() {
    const alert = await this.alertController.create({
      header: 'Turno en supermercado',
      subHeader: 'Don Pepe',
      message: 'Horario : 8:15',
      buttons: ['OK']
    });

    await alert.present();
  }

}
