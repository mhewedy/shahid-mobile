import { HomePage } from './../home/home';
import { TagService } from './service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [TagService]
})
export class ListPage {
  selectedItem: any;
  items: Array<string>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private tagService: TagService) {

    this.tagService.listTags().subscribe(
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

  itemTapped(event, item) {
    
    this.tagService.findByTag(item).subscribe(
        data => {
          this.navCtrl.push(HomePage, {
            items: data
          });
        },
        err => {
          console.log(err);
        }, 
        () => console.log("completed")
    )
  }
}
