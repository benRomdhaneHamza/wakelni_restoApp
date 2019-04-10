// @ts-ignore
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Subject } from 'rxjs/Subject';

import moment from 'moment';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	rootPage:any = 'HomePage';
	activePage = new Subject();
	pages = [];

	constructor(public platform: Platform,
		public statusBar: StatusBar,
		public splashScreen: SplashScreen) {
		this.initializeApp();
		moment.locale('fr');
		this.pages = [
      { title: 'Nouvelles commandes', component: 'HomePage', active: true, icon: 'home' },
      { title: 'Commandes acceptés', component: 'AcceptedCommandsPage', active: false, icon: 'home' },
		];
		
		this.activePage.subscribe((selectedPage: any) => {
      this.pages.map(page => {
        page.active = page.title === selectedPage.title;
      });
    });
	}
	
	initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
	}
	
	openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.activePage.next(page);
  }
}

