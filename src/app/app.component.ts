// @ts-ignore
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ActionSheetController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FcmProvider } from '../providers/fcm/fcm';
import { ToastController } from 'ionic-angular';
import { tap } from 'rxjs/operators';
import { Firebase } from '@ionic-native/firebase';

import { Subject } from 'rxjs/Subject';

import moment from 'moment';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	rootPage: any = 'HomePage';
	activePage = new Subject();
	pages = [];

	constructor(public platform: Platform,
		public statusBar: StatusBar,
		public splashScreen: SplashScreen,
		public fcm: FcmProvider,
		public toastCtrl: ToastController,
		public firebaseNative: Firebase,
		public actionSheetCtrl: ActionSheetController
	) {
		this.initializeApp();
		moment.locale('fr');
		this.pages = [
			{ title: 'Nouvelles commandes', component: 'HomePage', active: true, icon: 'home' },
			{ title: 'Commandes acceptés', component: 'AcceptedCommandsPage', active: false, icon: 'home' },
			// { title: 'Commandes pretes', component: 'ReadyCommandsPage', active: false, icon: 'home' }
			// { title: 'Commandes livrés et payé', component: 'AcceptedCommandsPage', active: false, icon: 'home' },
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

			this.fcm.listenToNotifications().pipe(
				tap(msg => {
					// show an action sheet
					const actionSheet = this.actionSheetCtrl.create({
						title: msg.body,
						buttons: [
							{
								text: 'Voir la commande',
								handler: () => {
									console.log('Voir la commande clicked', msg.commandId);
								}
							},
							{
								text: 'Fermer',
								role: 'cancel',
							}
						]
					});
					actionSheet.present();
					setTimeout(() => {
						actionSheet.dismiss();
					}, 5000);
				})
			).subscribe();

		});
	}

	openPage(page) {
		// Reset the content nav to have just this page
		// we wouldn't want the back button to show in this scenario
		this.nav.setRoot(page.component);
		this.activePage.next(page);
	}
}

