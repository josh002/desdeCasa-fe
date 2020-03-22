import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-popover-category',
  templateUrl: './popover-category.component.html',
  styleUrls: ['./popover-category.component.scss'],
})
export class PopoverCategoryComponent implements OnInit {
  categories: Category[];
  
  constructor(
    private popoverController: PopoverController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    this.categories = this.navParams.data.categories;
    console.log(this.categories);
  }

  imFedUpWithThisWorld(data: any) {
    this.popoverController.dismiss(data);
  }

}
