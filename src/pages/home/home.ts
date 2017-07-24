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

  term: string;

  seriesItems: Array<{id: number, sid: string, title: string, posterUrl: string}>;
  movieItems: Array<{id: number, sid: string, title: string, posterUrl: string, videoUrl: string, laUrl: string, durationSeconds: number}>;

  showNoDataFound: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
     private recentAndSearchService: RecentAndSearchService, private toastController: ToastController, 
     private plateform: Platform) {

      this.plateform.ready().then(
        (readySource) => {
          
          var navItems: any = navParams.get('items');

          console.log(navItems);

          if (navItems != null){
              if ((navItems.seriesList && navItems.seriesList.length > 0) || 
                navItems.movieList && navItems.movieList.length > 0){
                this.seriesItems = navItems.seriesList; 
                this.movieItems = navItems.movieList;
              }else{
                  this.showNoDataFound = true;
                  console.log("no data found!")
              }
          }else{
            this.recentAndSearchService.listsRecent().subscribe(
                  data => {
                    this.seriesItems = data.seriesList; 
                    this.movieItems = data.movieList;
                  },
                  err => {
                    this.showServerIpMissingToast(err)
                    console.log(JSON.stringify(err));
                  },
                  () => console.log('completed')
                );
          }
        }
      );
  }

  showSubTitle(): boolean {
    return this.seriesItems != null && this.seriesItems.length > 0 
      && this.movieItems != null && this.movieItems.length > 0 ;
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

  seriesItemTapped(event, item){
      console.log(item.id);
      
      this.navCtrl.push(EpisodePage, {
        item: item
      });
  }

  movieItemTapped(event, item){
      console.log(item.id);
      var queryString = '?title=' + item.title + '&laUrl=' + encodeURIComponent(item.laUrl)
       + '&durationSeconds=' + item.durationSeconds + "&posterUrl=" + item.posterUrl;
      window.open(item.videoUrl + queryString, '_system');
  }

  private showServerIpMissingToast(err: Error){
    if (err.constructor.name === 'NativeStorageError'){
      this.toastController.create({message: 'قم بوضع عنوان الخادم في قائمة الضبط' ,duration: 3000}).present();
    }
  }
}
