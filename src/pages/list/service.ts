import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
  
export class TagService {  
    static get parameters() {
        return [[Http]];
    }
  
    constructor(private http:Http) {
         
    }
  
    listTags() {
        var url = 'http://192.168.1.10:4567/tags';
        var response = this.http.get(url).map(res => res.json());
        return response;
    }

    findByTag(tag: string){
        var url = 'http://192.168.1.10:4567/tag?tag=' + encodeURI(tag);
        var response = this.http.get(url).map(res => res.json());
        return response;
    }
}