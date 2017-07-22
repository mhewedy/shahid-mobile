import { NativeStorage } from '@ionic-native/native-storage';
import { Observable } from 'rxjs/Observable';
import {Http} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/from';
  
export class TagService {  
    static get parameters() {
        return [[Http], [NativeStorage]];
    }
  
    constructor(private http:Http, private nativeStorage: NativeStorage) {
         
    }
  
    listTags() {
        return Observable.from(this.nativeStorage.getItem("serverIp"))
            .switchMap(serverIp => 
                this.http.get('http://' + serverIp + ':8801/series/tags')
                .map(res => res.json())
            )
    }

    findByTag(tag: string){
        return Observable.from(this.nativeStorage.getItem("serverIp"))
            .switchMap(serverIp => 
                this.http.get('http://' + serverIp + ':8801/series/tag?tag=' + encodeURI(tag))
                .map(res => res.json())
            )
    }
}