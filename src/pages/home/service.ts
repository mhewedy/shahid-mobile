import { Observable } from 'rxjs/Observable';
import { NativeStorage } from '@ionic-native/native-storage';
import {Http} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/from';
  
export class RecentAndSearchService {  
    static get parameters() {
        return [[Http], [NativeStorage]];
    }
  
    constructor(private http:Http, private nativeStorage: NativeStorage) {
        
    }
  
    listsRecent() {
        return Observable.from(this.nativeStorage.getItem("serverIp"))
            .switchMap(serverIp => 
                this.http.get('http://' + serverIp + ':8801/series/recent')
                .map(res => res.json())
            )
    }

    search(term: string){
        return Observable.from(this.nativeStorage.getItem("serverIp"))
            .switchMap(serverIp => 
                this.http.get('http://' + serverIp + ':8801/search?term=' + encodeURI(term))
                .map(res => res.json())
            )
    }

    getMovieTags(movieId: number){
        return Observable.from(this.nativeStorage.getItem("serverIp"))
            .switchMap(serverIp => 
                this.http.get('http://' + serverIp + ':8801/movie/tags/' + movieId)
                .map(res => res.json())
            )
    }
}