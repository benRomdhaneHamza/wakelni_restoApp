import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, AlertController   } from 'ionic-angular';
import { CommandsProvider } from "../../providers/commands/commands";

@IonicPage()
@Component({
  selector: 'page-command-details',
  templateUrl: 'command-details.html',
})
export class CommandDetailsPage {

	command  = null
	parent = null;

	constructor(public navCtrl: NavController,
		public navParams: NavParams,
		public menuCtrl: MenuController,
		private commandsProvider: CommandsProvider,
		public loadingCtrl: LoadingController,
		public alertCtrl: AlertController) {
		this.menuCtrl.enable(false, 'myMenu');
		this.command = this.navParams.get('command');
		this.parent = this.navParams.get('parent');
		this.command.mealsList = this.countDuplications(this.command.mealsList);
  }

  ionViewWillEnter() {
	}
	
	ionViewWillLeave() {
		this.menuCtrl.enable(true, 'myMenu');
	}

	countDuplications(_array) {
		let  count = {};
		const newArray = [];
    _array.forEach(function(i) {
			count[i._id] = (count[i._id]||0) + 1;
		});
		const mealsIdsValues = Object.keys(count)
		mealsIdsValues.forEach(_id => {
			let index = _array.findIndex(element => element._id === _id);
			_array[index].count = count[_id];
			newArray.push(_array[index]);
		});

		return newArray;
	}

	acceptCommand(_state) {
		const loader = this.loadingCtrl.create({content: "Validation ..." });
		loader.present();
		this.commandsProvider.changeState(this.command._id, _state).then(_res => {
			loader.dismiss();
			this.navCtrl.pop();
		}).catch(_err => {
			loader.dismiss();
			this.alertCtrl.create({
				title: 'Une erreur est survenue',
				buttons: ['OK']
			}).present();
		})
	}

}
