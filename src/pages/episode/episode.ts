import { EpisodeService } from './service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-episode',
  templateUrl: 'episode.html',
  providers: [EpisodeService]
})
export class EpisodePage {

  items: Array<{id: number, videoUrl: string, durationSeconds: number, watched: boolean}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private episodeService: EpisodeService) {

    var navItem: any = navParams.get('item');

    this.episodeService.listEpisode(navItem.id).subscribe(
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

  itemTapped(event, item){
      console.log("set as watched" + item.id);
      this.episodeService.setAsWatched(item.id).subscribe(
          data => {
            console.log(data);
          },
          err => {
            console.log(err);
          }, 
          () => console.log('Movie Search Complete')
        );
      window.open(item.videoUrl, '_system');
  }

}
