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
                this.http.get('http://' + serverIp + ':8801/recent')
                .map(res => res.json())
            )
    }

    search(term: string){
        return Observable.from(this.nativeStorage.getItem("serverIp"))
            .switchMap(serverIp => 
                this.http.get('http://' + serverIp + ':8801/series/search?term=' + encodeURI(term))
                .map(res => res.json())
            )
    }
}