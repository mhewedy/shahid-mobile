import { EpisodeService } from './service';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-episode',
  templateUrl: 'episode.html',
  providers: [EpisodeService]
})
export class EpisodePage {

  items: Array<{id: number, videoUrl: string, durationSeconds: number, watched: boolean}>;
  seriesId: string;
  title: string;
  tags: Array<string>;
  posterUrl: string;
  episodeCount: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
     private episodeService: EpisodeService, private toastController: ToastController) {

    var navItem: any = navParams.get('item');
    this.seriesId = navItem.id;
    this.loadList();
  }

  itemTapped(event, item, index){
      console.log("set as watched" + item.id);
      this.episodeService.setAsWatched(item.id).subscribe(
          data => {
            console.log(data);
          },
          err => {
            console.log(err);
            this.showServerIpMissingToast(err)
          }, 
          () => console.log('completed')
        );
      this.loadList();
      var queryString = '?title=' + this.title + '&episode=' + index + '&durationSeconds=' 
        + item.durationSeconds + "&posterUrl=" + this.posterUrl + "&seriesId=" + this.seriesId;
      window.open(item.videoUrl + queryString, '_system');
  }

  private loadList(){
    this.episodeService.listEpisode(this.seriesId).subscribe(
      data => {
        this.items = data.episodes;
        this.tags = data.tags;
        this.title = data.title;
        this.episodeCount = data.episodeCount - 1;
        this.posterUrl = data.posterUrl;
        console.log(data);
      },
      err => {
        this.showServerIpMissingToast(err)
        console.log(err);
      }, 
      () => console.log('completed')
    );
  }

  private showServerIpMissingToast(err: Error){
    if (err.constructor.name === 'NativeStorageError'){
      this.toastController.create({message: 'قم بوضع عنوان الخادم في قائمة الضبط' ,duration: 3000}).present();
    }
  }

}
