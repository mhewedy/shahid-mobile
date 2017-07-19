See: https://github.com/mhewedy/shahid

To run use: `ionic serve`   
To deploy to android use: `ionic cordova run android --device`

You might need to change the service IP at: 
* https://github.com/mhewedy/shahid-mobile/blob/master/src/pages/home/service.ts
* https://github.com/mhewedy/shahid-mobile/blob/master/src/pages/list/service.ts
* https://github.com/mhewedy/shahid-mobile/blob/master/src/pages/episode/service.ts

TODO: [I need to have single place to include the service IP](https://stackoverflow.com/questions/34986922/define-global-constants-in-angular-2)


I am using this application in conjenction with casting application, specifically I found this one very handy [VEGA Cast](https://play.google.com/store/apps/details?id=dkc.video.vcast&hl=en). As the job of this app is just to open the m3u8 file in the system Browser then I register the VEGA Cast app as a default handelr for the m3u8 URL.
