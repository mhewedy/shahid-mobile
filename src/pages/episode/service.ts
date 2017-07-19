import { Observable } from 'rxjs/Observable';
import { NativeStorage } from '@ionic-native/native-storage';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import 'rxjs/add/observable/from';
  
export class EpisodeService {  
    static get parameters() {
        return [[Http], [NativeStorage]];
    }
  
    constructor(private http:Http, private nativeStorage: NativeStorage) {
         
    }
    
    listEpisode(seriesId: string){
        return Observable.from(this.nativeStorage.getItem("serverIp"))
            .switchMap(serverIp => 
                this.http.get('http://' + serverIp + ':8801/episode/series/' + encodeURI(seriesId))
                .map(res => res.json())
            )
    }

    setAsWatched(episodeId: string){
         return Observable.from(this.nativeStorage.getItem("serverIp"))
            .switchMap(serverIp => 
                this.http.get('http://' + serverIp + ':8801/episode/watched/' + encodeURI(episodeId))
                .map(res => res.json())
            )
    }
}