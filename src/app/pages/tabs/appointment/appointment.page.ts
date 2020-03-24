import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage implements OnInit {

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
