import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/authService';
import { LocalStorageService } from 'src/app/services/localStorageService';
import { Commerce } from 'src/app/models/commerce.model';
import { Booking } from 'src/app/models/booking.model';
import { AlertService } from 'src/app/services/alertService';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { asDate } from 'src/app/constants/constants';

@Component({
  selector: 'app-schedule-hour',
  templateUrl: './schedule-hour.page.html',
  styleUrls: ['./schedule-hour.page.scss'],
})
export class ScheduleHourPage implements OnInit {
  //datos usados en este componente
  // name = 'Juan';
  // lastName = 'Gonzales';
  // dni = '126548785';

  bookings: any[];
  commerce: Commerce;

  constructor(
    public alertController: AlertController,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
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


  ionViewWillEnter() {

    this.commerce = new Commerce(this.localStorageService.getObject('commerce'));

    this.route.paramMap.subscribe(
      (params: Params) => {
        const hour: number = params.params.id;

        // this.authService.getBookingsByCommerce(this.commerce.id)
        this.authService.getBookingsByCommerce(20)
          .then((resp: any) => {
            console.log('commerce', this.commerce);
            this.bookings = [];
            resp.result.forEach(elem => this.bookings.push(new Booking(elem)));
            // this.bookings = this.bookings.filter(elem => elem.description == hour);            
            console.log('bookings', this.bookings)
          })
          .catch(err => {
            console.log('err', err);
            this.alertService.simpleAlert("Ocurrió un error inesperado. Intente más tarde.");
          });

      }
    )

  }

}
