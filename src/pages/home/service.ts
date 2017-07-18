import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
  
export class RecentService {  
    static get parameters() {
        return [[Http]];
    }
  
    constructor(private http:Http) {
         
    }
  
    listTags() {
        var url = 'http://localhost:4567/recent';
        var response = this.http.get(url).map(res => res.json());
        return response;
    }
}