import { RecentAndSearchService } from './service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [RecentAndSearchService]
})
export class HomePage {

  items: Array<{id: number, sid: string, title: string, posterUrl: string}>;
  term: string;

  showNoDataFound: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private recentAndSearchService: RecentAndSearchService) {

    var navItems: any = navParams.get('items');
    console.log("navitems", navItems);
    if (navItems != null){
        if (navItems.length > 0){
          this.items = navItems; 
        }else{
            this.showNoDataFound = true;
            console.log("no data found!")
        }
    }else{
      this.recentAndSearchService.listsRecent().subscribe(
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

  search(event) {
    if (this.term){
      this.recentAndSearchService.search(this.term).subscribe(
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

}
