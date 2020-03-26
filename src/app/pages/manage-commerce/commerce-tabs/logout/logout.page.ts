import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/localStorageService';
import { Router } from '@angular/router';
import { Commerce } from 'src/app/models/commerce.model';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {



  commerce: Commerce;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.commerce = new Commerce(this.localStorageService.getObject('commerce'));
    console.log('commerce', this.commerce)

  }

  doLogOut() {
    this.localStorageService.clearLocalStorage();
    this.router.navigateByUrl('/start');
  }


}



// import { Component, OnInit } from '@angular/core';
// import { Client } from 'src/app/models/client.model';
// import { LocalStorageService } from 'src/app/services/localStorageService';
// import { Router } from '@angular/router';


// @Component({
//   selector: 'app-logout',
//   templateUrl: './logout.page.html',
//   styleUrls: ['./logout.page.scss'],
// })
// export class LogoutPage implements OnInit {

//   email: string;
//   password: string;
//   client: Client;


//   constructor(
//     private localStorageService: LocalStorageService,
//     private router: Router,
//   ) {

//   }

//   ngOnInit() {

//   }

//   // Gotcha!
//   ionViewWillEnter() {
//     this.password = undefined;
//     console.log('COnsoleame algo FORRO!');
//     console.log('local storage', this.localStorageService.getObject('client'));
//     console.log('newClient', new Client(this.localStorageService.getObject('client')));
//     this.client = new Client(this.localStorageService.getObject('client'));
//     console.log('this.client', this.client)

//   }

//   doLogOut() {
//     this.localStorageService.clearLocalStorage();
//     this.router.navigateByUrl('/start');
//   }


// }

