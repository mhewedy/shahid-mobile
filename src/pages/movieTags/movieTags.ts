import { HomePage } from './../home/home';
import { TagService } from './service';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-movie-tags',
  templateUrl: 'movieTags.html',
  providers: [TagService]
})
export class MovieTags {
  selectedItem: any;
  items: Array<string>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
     private tagService: TagService, private toastController: ToastController) {

    this.tagService.listTags().subscribe(
      data => {
        this.items = data; 
        console.log(data);
      },
      err => {
        this.showServerIpMissingToast(err)
        console.log(err);
      },
      () => console.log('completed')
    );
  }

  itemTapped(event, item) {
    this.tagService.findByTag(item).subscribe(
        data => {
          this.navCtrl.push(HomePage, {
            items: data
          });
        },
        err => {
          this.showServerIpMissingToast(err)
          console.log(err);
        }, 
        () => console.log("completed")
    )
  }

  private showServerIpMissingToast(err: Error){
    if (err.constructor.name === 'NativeStorageError'){
      this.toastController.create({message: 'قم بوضع عنوان الخادم في قائمة الضبط' ,duration: 3000}).present();
    }
  }
}
