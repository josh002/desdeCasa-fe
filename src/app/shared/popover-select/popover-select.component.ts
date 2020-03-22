import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { Category } from 'src/app/models/category.model';
import { PoliticalParty } from 'src/app/models/politicalParty.model';

@Component({
  selector: 'app-popover-select',
  templateUrl: './popover-select.component.html',
  styleUrls: ['./popover-select.component.scss'],
})
export class PopoverSelectComponent implements OnInit {
  options: any[];

  constructor(
    private popoverController: PopoverController,
    private navParams: NavParams
    ) { }

    ngOnInit() {
      this.options = this.navParams.data.options;
      console.log(this.options);
    }
  
    onClick(data: any) {
      this.popoverController.dismiss(data);
    }

}