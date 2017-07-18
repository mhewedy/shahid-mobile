import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
  
export class EpisodeService {  
    static get parameters() {
        return [[Http]];
    }
  
    constructor(private http:Http) {
         
    }
    
    listEpisode(seriesId: string){
        var url = 'http://192.168.1.10:4567/episode/series/' + encodeURI(seriesId);
        var response = this.http.get(url).map(res => res.json());
        return response;
    }
}