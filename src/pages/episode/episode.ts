import { EpisodeService } from './service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-episode',
  templateUrl: 'episode.html',
  providers: [EpisodeService]
})
export class EpisodePage {

  items: Array<{videoUrl: string, durationSeconds: number}>;

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
      window.open(item.videoUrl, '_system');
  }

}
