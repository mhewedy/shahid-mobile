import { RecentService } from './service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [RecentService]
})
export class HomePage {

  items: Array<{id: number, sid: string, title: string, posterUrl: string}>;
  selectedItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private recentService: RecentService) {

    var navItems: any = navParams.get('items');
    if (navItems != null){
        this.items = navItems; 
    }else{
      this.recentService.listTags().subscribe(
            data => {
              this.items = data; 
              console.log(data);
            },
            err => {
              console.log(err);
            },
            () => console.log('Movie Search Complete')
          );
    }
  }

}
