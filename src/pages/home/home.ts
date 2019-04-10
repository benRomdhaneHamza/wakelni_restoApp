// @ts-ignore
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";
import { CommandsProvider } from "../../providers/commands/commands";
import moment from 'moment';

@IonicPage()
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	commands = [];

	constructor(public navController: NavController,
		public authProvider: AuthProvider,
		private commandsProvider: CommandsProvider) {
		this.authProvider.verifySession().then(_res => {
			if (!_res) this.navController.setRoot('LoginPage');
		});
	}

	ionViewWillEnter() {
		// get new commands
		this.commandsProvider.getCommands('SENT').then(_res => {
			this.commands = _res;
		}) 
	}

	showCommandDetails(_command) {
		console.log('command', _command);
	}

	formatDate(_date) {
		return moment(_date).fromNow();
	}

}
