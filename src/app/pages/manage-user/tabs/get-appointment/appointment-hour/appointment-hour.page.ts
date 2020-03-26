import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alertService';

@Component({
  selector: 'app-appointment-hour',
  templateUrl: './appointment-hour.page.html',
  styleUrls: ['./appointment-hour.page.scss'],
})
export class AppointmentHourPage implements OnInit {

  constructor(
    public alertController: AlertController,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }
  
  async confirm() {
    const alert = await this.alertController.create({
      header: 'Turno en supermercado',
      subHeader: 'Don Pepe',
      message: 'Horario : 8:15',
      cssClass:'alert-user',
      buttons: [{
          text:'Confirmar',          
        }]
    });

    await alert.present();
  }

}
