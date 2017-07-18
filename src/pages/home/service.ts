import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
  
export class RecentAndSearchService {  
    static get parameters() {
        return [[Http]];
    }
  
    constructor(private http:Http) {
         
    }
  
    listsRecent() {
        var url = 'http://192.168.1.10:4567/recent';
        var response = this.http.get(url).map(res => res.json());
        return response;
    }

    search(term: string){
        var url = 'http://192.168.1.10:4567/series/search?term=' + encodeURI(term);
        var response = this.http.get(url).map(res => res.json());
        return response;
    }


}