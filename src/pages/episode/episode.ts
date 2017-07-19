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

  constructor(public navCtrl: NavController, public navParams: NavParams,
     private episodeService: EpisodeService, private toastController: ToastController) {

    var navItem: any = navParams.get('item');
    this.seriesId = navItem.id;
    this.loadList();
  }

  itemTapped(event, item){
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
      window.open(item.videoUrl, '_system');
  }

  private loadList(){
    this.episodeService.listEpisode(this.seriesId).subscribe(
      data => {
        this.items = data;
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
