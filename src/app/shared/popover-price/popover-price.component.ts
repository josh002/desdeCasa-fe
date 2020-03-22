import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-popover-price',
  templateUrl: './popover-price.component.html',
  styleUrls: ['./popover-price.component.scss'],
})
export class PopoverPriceComponent implements OnInit {

  constructor(
    private popoverController: PopoverController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    console.log(this.navParams.data.categories);
  }

  imFedUpWithThisWorld(priceAsc: string) {
    this.popoverController.dismiss(priceAsc);
  }

}
