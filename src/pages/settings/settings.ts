import { HomePage } from './../home/home';

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
  providers: [NativeStorage]
})
export class SettingsPage {

  serverIp: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeStorage: NativeStorage) {
    this.nativeStorage.getItem('serverIp')
    .then(
      data => this.serverIp = data,
      error => console.error(error)
    );

  }

  saveServerIp(event){
    console.log(this.serverIp)
    this.nativeStorage.setItem('serverIp', this.serverIp)
      .then(
        () => console.log('Stored item!'),
        error => console.error('Error storing item', error)
      );

    this.navCtrl.setRoot(HomePage)
  }
}
