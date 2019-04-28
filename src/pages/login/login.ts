import { Component } from '@angular/core';
import { App, LoadingController, IonicPage, NavController, MenuController, AlertController } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";
import { FcmProvider } from '../../providers/fcm/fcm';

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {
	public loginCredentials = { email: null, password: null };
	public backgroundImage = 'assets/img/background/background-5.jpg';

	constructor(
		public loadingCtrl: LoadingController,
		public navController: NavController,
		private fcmProvider: FcmProvider,
		public alertCtrl: AlertController,
		public app: App,
		public authProvider: AuthProvider,
		public menuCtrl: MenuController
	) {
		this.menuCtrl.enable(false, 'myMenu');
	}

	login() {
		// this.navController.setRoot('HomePage');
		const loading = this.loadingCtrl.create();
		loading.present();
		this.authProvider.login(this.loginCredentials).then(_user => {
			this.fcmProvider.getToken().then(() => {
				loading.dismiss();
				this.navController.setRoot('HomePage');
			}).catch(_err => {
				this.catchLoginError(_err, loading);
			});
		}).catch(_err => {
			this.catchLoginError(_err, loading);
		});
	}

	ionViewWillLeave() {
		this.menuCtrl.enable(true, 'myMenu');
	}

	goToSignup() {
		// this.navCtrl.push(SignupPage);
	}

	goToResetPassword() {
		// this.navCtrl.push(ResetPasswordPage);
	}
	catchLoginError(_err, _loading) {
		_loading.dismiss();
		if (_err.error.wrongCredentials || _err.error.noSpaceFound) {
			this.alertCtrl.create({
				message: 'Veuillez verifier vos données',
				buttons: ['OK']
			}).present();
		} else {
			this.alertCtrl.create({
				message: 'Une erreur est survenue',
				buttons: ['OK']
			}).present();
		}
	}
}
