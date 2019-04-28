import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { environment as ENV } from '../../environments/environment';

@Injectable()
export class CommandsProvider {

	apiUrl = ENV.BASE_URL + '/commands';

	constructor(public http: HttpClient,
		private storage: Storage) { }

	public getCommands(_state = undefined) {
		return new Promise(async (resolve, reject) => {
			const token = await this.storage.get('token');
			const space = await this.storage.get('space');
			const headers = {
				'Content-Type': 'application/json',
				'x-access-token': token
			}
			this.http.get(this.apiUrl + '/space/'+ space._id+'?state='+_state, { headers: headers })
				.subscribe(_commands => {
					return resolve(_commands);
				}, _err => {
					return reject(_err);
				})
		})
	}

	public changeState(_command, _state) {
		return new Promise(async (resolve, reject) => {
			const token = await this.storage.get('token');
			const headers = {
				'Content-Type': 'application/json',
				'x-access-token': token
			}
			this.http.put(this.apiUrl + '/'+ _command+'/state?state='+_state, null, { headers: headers })
				.subscribe(_command => {
					return resolve(_command);
				}, _err => {
					return reject(_err);
				})
		});
	}

}
