import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-command-details',
  templateUrl: 'command-details.html',
})
export class CommandDetailsPage {

	command  = {}

	constructor(public navCtrl: NavController,
		public navParams: NavParams,
    public menuCtrl: MenuController) {
		this.menuCtrl.enable(false, 'myMenu');
		console.log('*-*-*CommandDetailsPage', this.navParams.get('command'));
		this.command = this.navParams.get('command');
  }

  ionViewWillEnter() {
	}
	
	ionViewWillLeave() {
		this.menuCtrl.enable(true, 'myMenu');
	}

}
