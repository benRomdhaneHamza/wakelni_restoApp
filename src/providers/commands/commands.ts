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

}
