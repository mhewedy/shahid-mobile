import { EpisodePage } from './../episode/episode';
import { RecentAndSearchService } from './service';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [RecentAndSearchService]
})
export class HomePage {

  items: Array<{id: number, sid: string, title: string, posterUrl: string}>;
  term: string;

  showNoDataFound: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
     private recentAndSearchService: RecentAndSearchService, private toastController: ToastController, 
     private plateform: Platform) {

      this.plateform.ready().then(
        (readySource) => {
          
          var navItems: any = navParams.get('items');
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
                  },
                  err => {
                    this.showServerIpMissingToast(err)
                    console.log(err);
                  },
                  () => console.log('completed')
                );
          }
        }
      );
  }

  search(event) {
    if (this.term){
      this.recentAndSearchService.search(this.term).subscribe(
              data => {
                this.navCtrl.push(HomePage, {items: data});
              },
              err => {
                this.showServerIpMissingToast(err)
                console.log(err);
              }, 
              () => console.log("completed")
          )
    }
  }

  itemTapped(event, item){
      console.log(item.id);
      
      this.navCtrl.push(EpisodePage, {
        item: item
      });
  }

  private showServerIpMissingToast(err: Error){
    if (err.constructor.name === 'NativeStorageError'){
      this.toastController.create({message: 'قم بوضع عنوان الخادم في قائمة الضبط' ,duration: 3000}).present();
    }
  }
}
